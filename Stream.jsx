import React from 'react';
import { useState } from 'react';


export default function Stream() {

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                    // or 'base/node_modules/@mediapipe/face_mesh' in npm.
    };
    (async ()=> {
        detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    })


    var video = document.createElement('video');
    video.autoplay = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
        {
            video: true,
        }
        )
        // If success
        .then((stream) => {
            video.srcObject = stream;
            //document.body.appendChild(video);
        })
    }
    
    return  <p>adsd</p>
}