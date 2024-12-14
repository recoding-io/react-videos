import React, { useRef, useState } from 'react'
import { FaCircleStop, FaMicrophone } from 'react-icons/fa6'

export default function Recorder
() {
    const [isRecording, setIsRecording] = useState(false)
    const [recordedURL, setRecordedURL] = useState('')
    const [seconds, setSeconds] = useState(0)

    const mediaStream = useRef(null)
    const mediaRecorder = useRef(null)
    const chunks = useRef([])

    const startRecording = async() => {
        setIsRecording(true)
        try{
            setSeconds(0)
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            mediaStream.current = stream
            mediaRecorder.current = new MediaRecorder(stream)
            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0){
                    chunks.current.push(e.data)
                }
            }
            const timer = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current,{type: 'audio/mp3'})
                const url = URL.createObjectURL(recordedBlob)
                setRecordedURL(url)

                chunks.current = []
                clearTimeout(timer)
            }

            mediaRecorder.current.start()

        }catch(error){
            console.log(error);
        }


    }

    const stopRecording = () => {
        setIsRecording(false)
        if(mediaRecorder.current){
            mediaRecorder.current.stop()
            mediaStream.current.getTracks().forEach(track => track.stop())
        }
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600)/60)
        const secs = totalSeconds % 60

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 gap-4'>

    <h1 className='text-white text-[60px] font-black'>
        Recorder
    </h1>

        <h2 className='text-[100px] text-white bg-black p-4 rounded-lg mx-4'>
            {formatTime(seconds)}
        </h2>

        {isRecording ? <button onClick={stopRecording} className='flex items-center justify-center text-[60px] bg-red-500 rounded-full p-4 text-white w-[100px] h-[100px]'>
            <FaCircleStop />
        </button> : 
            <button onClick={startRecording} className='flex items-center justify-center text-[60px] bg-blue-500 rounded-full p-4 text-white w-[100px] h-[100px]'>
                <FaMicrophone />
            </button>
        }

        {recordedURL && <audio controls src={recordedURL} />}
    </div>
  )
}
