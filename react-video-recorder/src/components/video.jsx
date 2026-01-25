import React, { useRef, useState, useEffect } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoURL, setVideoURL] = useState(false);
  const chunks = useRef([]);

  useEffect(() => {
    startPreview();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    if (!stream) {
      await startPreview();
      return;
    }

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, {
        type: "video/webm;codecs=vp8,opus",
      });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const startPreview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  return (
    <div className="flex flex-row items-center w-full justify-start min-h-screen bg-black text-white p-4 space-y-4">
      <div className="w-1/2">
        <h1 className="text-lg font-bold text-center">Video Recorder</h1>
        <div className="relative aspect-auto bg-gray-900 rounded-md overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform translate-x-1/2 z-10">
            {!recording ? (
              <button
                onClick={startRecording}
                className="w-16 h-16 bg-white rounded-full flex items-center text-white text-xl text-center"
              >
                <span className="w-16 h-16"></span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center text-black text-xl text-center"
              >
                <span className="w-16 h-16"></span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-lg font-bold text-center">Video Preview</h1>
        {videoURL && (
          <div className="mt-4">
            <div className="w-full flex flex-col items-center space-y-2">
              <video
                key={videoURL}
                src={videoURL}
                controls
                muted
                className="w-full h-full rounded-md shadow-md"
              />
              <a
                href={videoURL}
                download="recorded-video.webm"
                className="bg-green-600 px-4 py-2 rounded-md text-white font-medium shadow"
              >
                Download Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
