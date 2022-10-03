// Elements
const musicContainer = document.querySelector('.audioplayer')
const playButton = document.querySelector('.play')
const audio = document.querySelector('.audio')
const progress = document.querySelector('.scrub-progress')
const progressContainer = document.querySelector('.scrub')
const timestamp = document.querySelector('.timestamp')

// Event Listeners
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
})
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', resetAll);
progressContainer.addEventListener('click', setProgress);

// Function

function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('img').src = "/assets/images/icons/Pause2.svg";
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('img').src = "/assets/images/icons/Play2.svg";
    audio.pause();
}

function updateProgress(e) {
    // Progress Bar
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    // Timestamp
    var audioTotalTime = getTime(audio.duration);
    var audioCurrentTime = getTime(audio.currentTime);

    timestamp.innerHTML =  audioCurrentTime + '/' + audioTotalTime;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function resetAll() {
    pauseSong();
    audio.currentTime = 0;
}

function getTime(input) {
    var min = '';
    var sec = '';

    min = Math.floor(input / 60)
    
    if (Math.floor(input - (min * 60)) < 10) {
        sec = "0" + `${Math.floor(input - (min * 60))}`;
    } else {
        sec = Math.floor(input - (min * 60));
    }

    return min + ':' + sec;
}