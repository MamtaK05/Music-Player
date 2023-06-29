console.log("Welcome to Spotify");
let songindex=0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let songs =[
    {songname:"Blame The Night",filepath:"songs/1.mp3",coverpath:"covers/1.jpg"},
    {songname:"Daayre",filepath:"songs/2.mp3",coverpath:"covers/2.jpg"},
    {songname:"Jaadui",filepath:"songs/3.mp3",coverpath:"covers/3.jpg"},
    {songname:"Main Chali",filepath:"songs/4.mp3",coverpath:"covers/4.jpg"},
    {songname:"Rista Rista",filepath:"songs/5.mp3",coverpath:"covers/5.jpg"},
    {songname:"Tere Naal Rehniyaa",filepath:"songs/6.mp3",coverpath:"covers/6.jpg"},
    {songname:"Tu Jo Mila",filepath:"songs/7.mp3",coverpath:"covers/7.jpg"},
    {songname:"Woh Din",filepath:"songs/8.mp3",coverpath:"covers/8.jpg"},
]

//audioelement.play();
songItems.forEach((element, i) => {
    const audioElement = new Audio(songs[i].filepath);
    audioElement.addEventListener('loadedmetadata', function() {
      const duration = Math.floor(audioElement.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      element.getElementsByTagName('img')[0].src = songs[i].coverpath;
      element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
      element.getElementsByClassName('time')[0].innerText = formattedDuration;
    });
  });

//Handle play/pause
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        updatePlayPauseIcon(songindex);
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        updatePlayPauseIcon(0);
    }
})


audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
  

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeallPlays= ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    //console.log(document.getElementsByClassName("songitemplay"))
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeallPlays();
        songindex = parseInt(e.target.id);
        
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/${songindex}.mp3`;
        mastersongname.innerText = songs[songindex-1].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=7){
        songindex=0;
    }else{
        songindex +=1;
    }
    mastersongname.innerText = songs[songindex-1].songname;
    audioElement.src= `songs/${songindex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    updatePlayPauseIcon(songindex);
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }else{
        songindex -=1;
    }
    mastersongname.innerText = songs[songindex-1].songname;
    audioElement.src= `songs/${songindex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    updatePlayPauseIcon(songindex);
})

audioElement.addEventListener('ended', () => {
    if (songindex >= songs.length - 1) {
      songindex = 0;
    } else {
      songindex += 1;
    }
    mastersongname.innerText = songs[songindex].songname;
    audioElement.src = songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    updatePlayPauseIcon(songindex);
  });

  function updatePlayPauseIcon(songIndex) {
    const songitemplayElements = document.getElementsByClassName('songitemplay');
    Array.from(songitemplayElements).forEach((element) => {
      const elementId = parseInt(element.id);
      if (elementId === songIndex) {
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');
      } else {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
      }
    });
  }
  