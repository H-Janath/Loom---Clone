import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

type Props = {
    transcript: string
}

const VideoTranscript = ({transcript}: Props) => {
  return (
    <div>
        <TabsContent
            value="Transcript"
            className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-6 '>
                <p className='text-[#a7a7a7]'>{transcript}</p>
        </TabsContent>
    </div>
  )
}

export default VideoTranscript