'use client'
import { cn } from '@/lib/utils'
import { usePathname,useRouter } from 'next/navigation'
import React from 'react'
import Loader from '../loader'

type Props = {
    name:string
    id:string
    optimistic: boolean
    count?: number
}

const Folder = ({id,name,optimistic,count}: Props) => {
    const pathName = usePathname();
    const router = useRouter();
    //WIP:add loading state
  return (
    <div
      className={cn(
        'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]'
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          <p className='text-netural-300'>
            {name}
          </p>
        </div>
      </Loader>
    </div>
  )
}

export default Folder