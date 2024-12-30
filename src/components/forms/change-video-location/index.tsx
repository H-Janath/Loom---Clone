import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useMoveVideos } from '@/hooks/useFolders'
import { space } from 'postcss/lib/list'
import React from 'react'

type Props = {
    currentFolder?: string
    currentWorkspcae?: string
    videoId: string
    currentFolderName?: string
}

const ChangeVideoLoaction = ({
    currentFolder,
    currentWorkspcae,
    videoId,
    currentFolderName
}: Props) => {

    const {
        register,
        isPending,
        onFormSubmit,
        folders,
        workspaces,
        isFetching,
        isFolders
    } = useMoveVideos(videoId,currentWorkspcae);

    const folder = folders.find((f)=> f.id === currentFolder)
    const workspace = workspaces.find((f)=> f.id === currentWorkspcae)

   
   
  return (
    <form className='flex flex-col gap-y-5'>
        <div className="border-[1px] rounded-xl p-5">
            <h2 className='text-xs mb-5 text-[#a4a4a4] '>Current</h2>
            {workspace && <p className='text-[#a4a4a4]'>{workspace.name} Workspace</p>}
            <p className='text-[#a4a4a4]'>Prodigies University Folder</p>
        </div>
        <Separator orientation="horizontal"/>
        <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
            <h2 className='text-xs text-[#a4a4a4]'>To</h2>
            <Label className='flex-col gap-y-2 flex'>
                <p className='text-xs'>Workspace</p>
                <select className='rounded-xl text-base bg-transparent'>
                     <option
                        className='tet-[#a4a4a4]'
                        value={'something'}
                     >
                            Workspace
                     </option>
                </select>
            </Label>
        </div>

    </form>
  )
}

export default ChangeVideoLoaction