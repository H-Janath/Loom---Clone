"use client";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorksPaces } from "@/actions/workspace";

type Props = {
  activeWorkspaceId: string;
};

function Sidebar({ activeWorkspaceId }: Props) {
  const route = useRouter();

  const {data,isFetched} = useQueryData([
    "use-workspaces",getWorksPaces
  ]);

  const onChangeActiveWorkspace = (value: string) => {
    route.push(`/dasboard/${value}`);
  };
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

    </SelectGroup>
  </SelectContent>
</Select>

    </div>
  );
}

export default Sidebar;
