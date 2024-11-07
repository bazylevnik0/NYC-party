import React from 'react';
import { useState, useRef } from 'react';

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'


export default function Stream(props) {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    };
    const detector = faceLandmarksDetection.createDetector(model, detectorConfig);
    
    const interval = useRef();
    
    if (props.video.videoActive) {
        let video = document.createElement('video');
            video.autoplay = true;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
            {
                video: true,
            })
            // If success
            .then(async (stream) => {
                let detector_temp = await detector;
                video.srcObject = stream;
                interval.current = setInterval(()=>{
                    const estimationConfig = {flipHorizontal: false};
                    (async()=>{
                        const faces = await detector_temp.estimateFaces(video, estimationConfig);
                        console.log(faces)
                    })();
                },100)
            })
        }
    } else {
        console.log(2)
        clearInterval(interval.current);
    }

    let answer_video_active = (<Canvas>
                                <mesh>
                                <boxGeometry args={[2, 2, 2]} />
                                <meshPhongMaterial />
                                </mesh>
                                <ambientLight intensity={0.1} />
                                <directionalLight position={[0, 0, 5]} color="red" />
                               </Canvas>);  

    let answer_video_inactive = (<div>none</div>)

    if (props.video.videoActive) {
        return answer_video_active;
    } else {
        return answer_video_inactive;
    }  
}