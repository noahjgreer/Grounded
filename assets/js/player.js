var player = document.getElementById('player').innerHTML;
var playButton = document.getElementsByClassName('play')[0];
var audio = document.getElementsByTagName('audio')[0];
var currentAudioPosition;
var playbackBarContainer = document.querySelector('.playback-container');
var playbackBar = document.querySelector('.playback');
var pauseStatus = audio.paused;

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', endEvents);
audio.addEventListener('pause', audioPaused);
audio.addEventListener('play', audioPlay);
playbackBarContainer.addEventListener('mousedown', setProgress);

function audioPlay(e) {
    playButton.style["background-image"] = "url(/assets/icons/pause.svg)"
}

function audioPaused(e) {
    playButton.style["background-image"] = "url(/assets/icons/play.svg)"
}

function endEvents(e) {
    audioPaused();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    currentAudioPosition = (currentTime / duration) * 100;

    playbackBar.style.width = `${currentAudioPosition}%`
}

function setProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


function togglePlay() {

    if (pauseStatus == false) {
        audio.pause();
        playButton.style["background-image"] = "url(/assets/icons/play.svg)"

        pauseStatus = true;
    } else {
        audio.play();
        playButton.style["background-image"] = "url(/assets/icons/pause.svg)"


        pauseStatus = false;
    }
}