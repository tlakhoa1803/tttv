const songs = [
    { image: 'image/1.jpg', song: 'music/6.mp3', title: 'Chúc', startTime: 1 },
    { image: 'image/2.jpg', song: 'music/5.mp3', title: 'Bé', startTime: 5 },
    { image: 'image/3.jpg', song: 'music/4.mp3', title: 'Thảo Vy', startTime: 1 },
    { image: 'image/4.jpg', song: 'music/3.mp3', title: '01/06' },
    { image: 'image/5.jpg', song: 'music/2.mp3', title: 'Vui vẻ 🙆'},
    { image: 'image/5.jpg', song: 'music/1.mp3', title: 'I’ll always find a way to support you 🦝', startTime: 1 },

];

let currentIndex = 0;
let isPlaying = false;
let isStartTimeSet = false;

const imageElement = document.getElementById('image');
const audioElement = document.getElementById('audio');
const playPauseIcon = document.getElementById('playPauseIcon');
const songTitleElement = document.getElementById('songTitle');

function updateSong() {
    const song = songs[currentIndex];
    imageElement.src = song.image;
    audioElement.src = song.song;
    songTitleElement.textContent = song.title || "Không có tiêu đề";
    
    isStartTimeSet = false;
    audioElement.load();
}

function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
        playPauseIcon.src = "icon/pause.png";
        isPlaying = true;
    } else {
        audioElement.pause();
        playPauseIcon.src = "icon/play.png";
        isPlaying = false;
    }
}

// Set thời gian bắt đầu khi bài hát bắt đầu phát, chỉ 1 lần mỗi bài
audioElement.addEventListener('play', () => {
    const song = songs[currentIndex];
    if (!isStartTimeSet && song.startTime) {
        audioElement.currentTime = song.startTime;
        isStartTimeSet = true;
    }
});

// Khi bài hát kết thúc, tự động chuyển sang bài tiếp theo
audioElement.addEventListener('ended', () => {
    nextSong();
});

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    updateSong();
    if (isPlaying) audioElement.play();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    updateSong();
    if (isPlaying) audioElement.play();
}

function changeVolume(value) {
    audioElement.volume = value;
}

// Khởi tạo bài đầu tiên khi trang tải
updateSong();
