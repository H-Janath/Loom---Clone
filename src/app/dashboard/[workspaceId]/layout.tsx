import { getNotifications, onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getWorkspaceFolder, getWorksPaces, verifyAccessToWorkspace } from '@/actions/workspace'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {workspaceId: string}
  children: React.ReactNode
}

const Layout =async({params:{workspaceId},children}:Props) => {

  const auth = await onAuthenticateUser();
  if(!auth.user?.workspace) redirect('/auth/sign-in')
  if(!auth.user.workspace.length) redirect('/auth/sign-in')
    const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if(hasAccess.status !== 200){
    redirect(`/dashboard/${auth.user?.workspace[0].id}`)
  }
  if(hasAccess.data?.workspace) return null;

  const query = new QueryClient();
  
  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: ()=> getWorkspaceFolder(workspaceId),
  })
  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: ()=> getAllUserVideos(workspaceId),
  })
  await query.prefetchQuery({
    queryKey: ['user-workspace'],
    queryFn: ()=> getWorksPaces(),
  })
  await query.prefetchQuery({
    queryKey: ['user-notification'],
    queryFn: ()=> getNotifications(),
  })

  return (
    <div className=""></div>

  )
}

export default Layout;