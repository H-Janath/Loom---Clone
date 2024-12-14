"use client";
import { getWorksPaces } from "@/actions/workspace";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { useQueryData } from "@/hooks/useQueryData";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import WorkspaceForm from "@/components/forms/workspace-from";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(["user-workspace"], getWorksPaces);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a workspace"
        description="Workspace helps you collaborate with team members. You assigned a default personal workspace where you can share videos in private with youreself"
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlusDuotine />
            Create a workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};
export default CreateWorkspace;
