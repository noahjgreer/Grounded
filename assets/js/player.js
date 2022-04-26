var player = document.getElementById('player').innerHTML;
var playButton = document.getElementsByClassName('play')[0];
var audio = document.getElementsByTagName('audio')[0];
var playStatus = false;

function togglePlay() {
    if (playStatus == false) {
        audio.play();
        playButton.style["background-image"] = "url(/assets/icons/pause.svg)"

        playStatus = true;
    } else {
        audio.pause();
        playButton.style["background-image"] = "url(/assets/icons/play.svg)"
        playStatus = false;
    }
}