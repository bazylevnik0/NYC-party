import React from 'react';
import { useState } from 'react';


export default function Stream() {

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    };
        let detector = faceLandmarksDetection.createDetector(model, detectorConfig);
        var video = document.createElement('video');
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
                setInterval(()=>{
                    const estimationConfig = {flipHorizontal: false};
                    (async()=>{
                        const faces = await detector_temp.estimateFaces(video, estimationConfig);
                        console.log(faces)
                    })();
            
                },100)
            })
        }

    return  <p>adsd</p>
}