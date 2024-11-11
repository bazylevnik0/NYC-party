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
   
    const interval_video = useRef();

    let video = document.createElement('video');
        video.autoplay = true;
    let canvas_temp = document.getElementById("canvas_temp");
    let canvas_temp_ctx = canvas_temp.getContext("2d");
    const [rotation, setRotation] = useState([]);
    if (props.video.videoActive) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
            {
                video: true,
            })
            // If success
            .then((stream) => {
                video.srcObject = stream;
                canvas_temp_ctx.drawImage(video, 0, 0, canvas_temp.width, canvas_temp.height);
                interval_video.current = setInterval(()=>{
                    
                    let src = cv.imread('canvas_temp');
                    let gray = new cv.Mat();
                    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
                    let faces = new cv.RectVector();
                    let eyes = new cv.RectVector();
                    
                    let faceCascade = new cv.CascadeClassifier();
                    let eyeCascade = new cv.CascadeClassifier();
                    (async () => {
                        const url = window.location.href+'haarcascade_frontalface_default.xml';
                        
                        try {
                          const response = await fetch(url);
                          faceCascade.load(response.text());
                        //eyeCascade .load(window.location.href+'haarcascade_eye.xml');
                        
                        // detect faces
                        let msize = new cv.Size(0, 0);
                        faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
                        for (let i = 0; i < faces.size(); ++i) {
                            let roiGray = gray.roi(faces.get(i));
                            let roiSrc = src.roi(faces.get(i));
                            /*
                            let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
                            let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
                                                    faces.get(i).y + faces.get(i).height);
                            */
                            // detect eyes in face ROI
                            /*
                            eyeCascade.detectMultiScale(roiGray, eyes);
                            for (let j = 0; j < eyes.size(); ++j) {
                                let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
                                let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
                                                          eyes.get(j).y + eyes.get(j).height);
                              console.log("point1: ",point1, "point2: ", point2);
                            }
                            roiGray.delete(); roiSrc.delete();
                            */
                        }
                         
                        } catch (error) {

                        }
                           
                    })();
                },100)
                
            })
        }
    } else {
        clearInterval(interval_video.current);
    }

    let answer_video_active = ( <Canvas>
                                    <Skull rotation={rotation}/>
                                    <ambientLight intensity={0.1} />
                                    <directionalLight position={[0, 0, 5]} color="white" />
                                </Canvas>
                              );  

    let answer_video_inactive = (<div>none</div>)

    if (props.video.videoActive) {
        return answer_video_active;
    } else {
        return answer_video_inactive;
    }  
}