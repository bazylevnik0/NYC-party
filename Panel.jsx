import React from 'react';
import { useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function Panel(props) {
    
    var socket = io();

    function change_state_video (e) {
        if (e.target.checked) {
            props.video.setVideoActive(true);
        } else {
            props.video.setVideoActive(false);
        }
    }

    let mediaRecorderAudio;
    let interval;
    function change_state_audio (e) {
        console.log(e.target.checked);
        if (e.target.checked) {
            props.audio.setAudioActive(true);
            // Ask permission
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(
                    {
                        audio: true,
                    }
                )
                // If success
                .then((stream) => {
                    mediaRecorderAudio = new MediaRecorder(stream);
                    mediaRecorderAudio.addEventListener("dataavailable", async (stream) => {
                        // Send stream data while mediaRecorderAudio is active
                        let blob = new Blob([stream.data], { type: "audio/ogg; codecs=opus" });
                        let buffer = await blob.arrayBuffer();
                        let data_to_send =  new Uint8Array(buffer);
                        socket.emit('socket_audio',JSON.stringify(data_to_send))
                    });
                    interval = setInterval(()=>{mediaRecorderAudio.stop();mediaRecorderAudio.start(1000)},1000);
                })
            }
        } else {
            mediaRecorderAudio.stop();
            clearInterval(interval)
            props.audio.setAudioActive(false);
        }
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

    return (<div>
         <label>Audio: </label><Switch onChange={change_state_audio} />
         <label>Video: </label><Switch onChange={change_state_video} />
    </div>)
}