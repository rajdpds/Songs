const audio = document.getElementById("audio")

const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")

const title = document.getElementById("title")
const artist = document.getElementById("artist")
const cover = document.getElementById("cover")

const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

let songIndex = 0

function loadSong(song){

title.innerText = song.title
artist.innerText = song.artist
audio.src = song.src
cover.src = song.cover

}

loadSong(songs[songIndex])

function playSong(){

audio.play()
playBtn.innerText="⏸"

}

function pauseSong(){

audio.pause()
playBtn.innerText="▶"

}

playBtn.addEventListener("click",()=>{

if(audio.paused){
playSong()
}else{
pauseSong()
}

})

nextBtn.addEventListener("click",()=>{

songIndex++

if(songIndex>songs.length-1){

songIndex=0

}

loadSong(songs[songIndex])
playSong()

})

prevBtn.addEventListener("click",()=>{

songIndex--

if(songIndex<0){

songIndex=songs.length-1

}

loadSong(songs[songIndex])
playSong()

})

audio.addEventListener("timeupdate",updateProgress)

function updateProgress(e){

const {duration,currentTime} = e.srcElement

const progressPercent = (currentTime/duration)*100

progress.style.width = progressPercent + "%"

}

progressContainer.addEventListener("click",setProgress)

function setProgress(e){

const width = this.clientWidth
const clickX = e.offsetX

const duration = audio.duration

audio.currentTime = (clickX/width)*duration

}

audio.addEventListener("ended",()=>{

nextBtn.click()

})

/* swipe gesture */

let startX=0

document.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX

})

document.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX

if(startX-endX>50){

nextBtn.click()

}

if(endX-startX>50){

prevBtn.click()

}

})
