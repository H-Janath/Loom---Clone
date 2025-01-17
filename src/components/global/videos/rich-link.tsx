import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

type Props = {title: string,id:string, source:string, description: string}

const RichLink = ({description,id,source,title}: Props) => {

  const CopyRichText = () => {
    const originalTitle = title
    const thumbnail = `<a style="display: flex; flex-direction: column; gap: 10px" href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
    <h3 style="text-decoration: none; color: black; margin: 0;">${title}</h3>
    <p style="text-decoration: none; color: black; margin: 0;">${description}</p>
    <video
        width="320"
        style="display: block"
        >
            <source
                type="video/webm"
                src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}"
            />
        </video>
    </a>`
    const thumbnailBlob = new Blob([thumbnail], {type: 'text/html'})
    const blobTitle = new Blob([originalTitle], {type: 'text/plain'})
    const data = [
      new ClipboardItem({
        ['text/plain']: blobTitle,
        ['text/html']: thumbnailBlob,
      }),
    ]
    navigator.clipboard.write(data).then(()=>{
      return toast('Embedded Link Copied',{
        description: 'Successfully copied embedded link',
      })
    })
  }
  return (
    <div>
      <Button onClick={CopyRichText} className='rounded-full'>
         Get Embedded Code
      </Button>
    </div>
  )
}

export default RichLink