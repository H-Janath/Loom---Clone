import {
  getNotifications,
  onAuthenticateUser,
} from '@/actions/user';
import {
  getAllUserVideos,
  getWorkspaceFolder,
  getWorksPaces,
  verifyAccessToWorkspace,
} from '@/actions/workspace';
import GlobalHeader from '@/components/global/global-header';
import Sidebar from '@/components/global/sidebar';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  // Authenticate user
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace || auth.user.workspace.length === 0) {
    redirect('/auth/sign-in');
  }

  console.log(workspaceId)
  // Check workspace access
  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }
  if (!hasAccess.data?.workspace) {
    return null;
  }

  // Initialize QueryClient and prefetch data
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['workspace-folders', workspaceId],
        queryFn: () => getWorkspaceFolder(workspaceId),
      }),
      queryClient.prefetchQuery({
        queryKey: ['user-videos', workspaceId],
        queryFn: () => getAllUserVideos(workspaceId),
      }),
      queryClient.prefetchQuery({
        queryKey: ['user-workspace'],
        queryFn: getWorksPaces,
      }),
      queryClient.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: getNotifications,
      }),
    ]);
  } catch (error) {
    console.error('Error prefetching data:', error);
    redirect('/error');
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="w-full pt-28 overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workspace={hasAccess.data.workspace}/>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
