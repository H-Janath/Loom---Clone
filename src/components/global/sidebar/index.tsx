"use client";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userQueryData } from "@/hooks/userQueryData";
import { getWorksPaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types/index.type";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";

type Props = {
  activeWorkspaceId: string;
};


function Sidebar({ activeWorkspaceId }: Props) {
  const route = useRouter();
  const { data, isFetched } = userQueryData(["user-workspace"], getWorksPaces);
  const { data: workspace } = data as WorkspaceProps;

  const onChangeActiveWorkspace = (value: string) => {
    route.push(`/dasboard/${value}`);
  };
  const currentWorkspace = workspace.workspace.find(
    (s)=>s.id===activeWorkspaceId
  )

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src={"/opal-logo.svg"} height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 bg-transparent ">
          <SelectValue>Select a workspace</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111]">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
       {currentWorkspace?.type==="PUBLIC"&&<Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId}/>
          </Modal>}
    </div>
  );
}

export default Sidebar;
