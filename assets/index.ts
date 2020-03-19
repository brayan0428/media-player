import MediaPlayer from "./MediaPlayer"
import AutoPlay from "./plugins/AutoPlay"
import AutoPause from "./plugins/AutoPause"
import AdsPlugin from "./plugins/Ads";

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video, 
    plugins: 
    [
        new AutoPlay(),
        new AutoPause(),
        new AdsPlugin()
    ] 
});

const button = document.getElementById('buttonPlay');
const buttonMute = document.getElementById("buttonMute")

button.onclick = () => player.togglePlay();
buttonMute.onclick = () => video.muted ? player.unmuted() : player.muted()

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log(error)
    })
}