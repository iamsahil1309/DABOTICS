const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName : 'Mirror',
        cover : 'assets/1.jpg',
        artist : 'Justin Timberlake'
    },
    {
        path: 'assets/2.mp3',
        displayName : 'Blue Butterflies',
        cover : 'assets/2.jpg',
        artist : 'JHIN'
    },
    {
        path: 'assets/3.mp3',
        displayName : 'Beautiful',
        cover : 'assets/3.jpg',
        artist : 'Crush'
    },
    {
        path: 'assets/4.mp3',
        displayName : 'Cant help falling',
        cover : 'assets/4.jpg',
        artist : 'Elvis'
    },
    {
        path: 'assets/5.mp3',
        displayName : 'Let me down',
        cover : 'assets/5.jpg',
        artist : 'NF'
    },
    {
        path: 'assets/6.mp3',
        displayName : 'Strawberries & Cigarettes',
        cover : 'assets/6.jpg',
        artist : 'Troye Sivan'
    },
    {
        path: 'assets/7.mp3',
        displayName : 'Wildflower',
        cover : 'assets/7.jpg',
        artist : 'RM'
    },
    {
        path: 'assets/8.mp3',
        displayName : 'Lighting Up Your World ',
        cover : 'assets/8.jpg',
        artist : 'Janet Suhh'
    },
    {
        path: 'assets/9.mp3',
        displayName : 'Love me like that',
        cover : 'assets/9.jpg',
        artist : 'Sam Kim'
    },
    {
        path: 'assets/10.mp3',
        displayName : 'Untill i found you',
        cover : 'assets/10.jpg',
        artist : 'Stephen Sanche'
    },
    
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic(); 
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
    image.classList.add('rotate')
    wave.classList.add('loader');
   
}

function pauseMusic() {
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
    image.classList.remove('rotate')
    wave.classList.remove('loader');
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);