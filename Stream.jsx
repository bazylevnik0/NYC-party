import React from 'react';
import { useState, useRef } from 'react';

import { Canvas } from '@react-three/fiber'

import Skull from './Skull.jsx'


export default function Stream(props) {
    // Audio
    var socket = io();

    let interval_audio;
    let check = document.getElementById("switch_audio") 
    if (props.audio.audioActive) {
        // Ask permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
                {
                    audio: true,
                }
            )
            // If success
            .then((stream) => {
                let mediaRecorderAudio = new MediaRecorder(stream);
                mediaRecorderAudio.addEventListener("dataavailable", async (stream) => {
                    // Send stream data while mediaRecorderAudio is active
                    let blob = new Blob([stream.data], { type: "audio/ogg; codecs=opus" });
                    let buffer = await blob.arrayBuffer();
                    let data_to_send =  new Uint8Array(buffer);
                    socket.emit('socket_audio',JSON.stringify(data_to_send));
                });
                interval_audio = setInterval(()=>{ 
                    mediaRecorderAudio.stop();
                    if (check.checked) {
                        mediaRecorderAudio.start(1000);
                    } else {
                        mediaRecorderAudio.stop();
                        clearInterval(interval_audio);
                    }
                },1000,);
            })
        }
    } else {
        //check = false;
    }

    let sounds = [];
    socket.on('broadcast_audio', function(data) {
        (async () => {
          let blob  = new Blob( [new Uint8Array(Object.values(JSON.parse(data))).buffer], { type: "audio/ogg; codecs=opus" });
          var url   = await URL.createObjectURL( blob );
          let sound = new Audio();
              sound.src = url;
              sound.play();
        })();
       
    });

    // Video 
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    };
    const detector = faceLandmarksDetection.createDetector(model, detectorConfig);
    
    const interval_video = useRef();

    let video = document.createElement('video');
        video.autoplay = true;

    const [rotation, setRotation] = useState([]);
    if (props.video.videoActive) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
            {
                video: true,
            })
            // If success
            .then(async (stream) => {
                //[0].keypoints[7] rightEye
                //[0].keypoints[263] leftEye
                let detector_temp = await detector;
                video.srcObject = stream;
                interval_video.current = setInterval(()=>{
                    const estimationConfig = {flipHorizontal: false};
                    (async()=>{
                        const faces = await detector_temp.estimateFaces(video, estimationConfig);
                        //console.log("asd")
                        if (faces && faces[0] && faces[0].keypoints ) setRotation([0,faces[0].keypoints[7].z/50,0])
                        //console.log("left: ",faces[0].keypoints[7].z,"right: ",faces[0].keypoints[263].z);
                    })();
                },100)
                
            })
        }
    } else {
        clearInterval(interval_video.current);
    }

    let answer_video_active = (<Canvas>
                                <Skull rotation={rotation}/>
                                <ambientLight intensity={0.1} />
                                <directionalLight position={[0, 0, 5]} color="white" />
                               </Canvas>);  

    let answer_video_inactive = (<div>none</div>)

    if (props.video.videoActive) {
        return answer_video_active;
    } else {
        return answer_video_inactive;
    }  
}