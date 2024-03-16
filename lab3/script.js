// const s1=document.querySelector('#sound1');
// const s2=document.querySelector('#sound2');
// const s3=document.querySelector('#sound3');
// const s4=document.querySelector('#sound4');

const sounds={
    'a':document.querySelector('#sound1'),
    's':document.querySelector('#sound2'),
    'd':document.querySelector('#sound3'),
    'f':document.querySelector('#sound4'),
    'g':document.querySelector('#sound5'),

    'z':document.querySelector('#sound6'),
    'x':document.querySelector('#sound7'),
    'c':document.querySelector('#sound8'),
    'v':document.querySelector('#sound9'),
}
//tablica tablic obiektów, dla każdej ścieżki własna tablica a wniej obiekt 
const times = [[], [], [], []];

//tablica checkboxów
const checkbox = [
    document.querySelector('#track1'),
    document.querySelector('#track2'),
    document.querySelector('#track3'),
    document.querySelector('#track4')
];


const start = document.querySelector('#start');
const end = document.querySelector('#stop');
const time = document.querySelector('#time');
const tykacz = document.querySelector('#tykacz');

tykacz.addEventListener('change',()=>{
    if(tykacz.checked){
        console.log("Tykanie");
        tykaczInterval = setInterval(() => {
            sounds['a'].currentTime = 0;
            sounds['a'].play();
        }, 500);
    } else {
        if (tykaczInterval) {
            clearInterval(tykaczInterval); 
        }
    }
    })
        
            


const play = document.querySelector('#play');

let startTime
let endTime
let isRecording=false
const playTrack = document.querySelector('#time')

//odpalamy scieżke po checkboxie
play.addEventListener('click', () => {
    checkbox.forEach((checkbox, index) => {
        if (checkbox.checked) {
            playTracks(times[index]);
        }
    });
});

function playTracks(timesArray) {
    timesArray.forEach(element => {
        const soundToPlay = sounds[element.key];
        if (soundToPlay) {
            setTimeout(() => {
                soundToPlay.currentTime = 0;
                soundToPlay.play();
            }, element.time);
        }
    });
}

//nagrywaj
start.addEventListener('click',()=>{
    startTime = Date.now();
    isRecording=true
    currentTrackIndex = checkbox.findIndex(checkbox => checkbox.checked); //znajdz zaznaczone checkboxy
})

//koniec nagrania - czas
end.addEventListener('click',()=>{
    endTime= Date.now();   
    isRecording=false
    let timeResult = endTime-startTime
    time.textContent=timeResult
})

addEventListener('keypress',(ev)=> {
    if(isRecording){
        const key =ev.key
        //times[ev.key]=Date.now()

        const sound = sounds[key];
        if (sound) {
            times[currentTrackIndex].push({
                key: key,
                time: Date.now() - startTime,
            });
            sound.currentTime = 0;
            sound.play();
        }
    }
})    

console.log(times)





// addEventListener('keypress',(ev)=> {
//     const key =ev.key

//     const sound = sounds[key]
//     sound.currentTime = 0
//     sound.play()
// })

    // switch(key){
    //     case 'a':
    //         s1.currentTime=0
    //         s1.play()
    //         break;    
    //     case 'a':
    //         s1.currentTime=0
    //         s1.play()
    //         break;    
    //     case 'a':
    //         s1.currentTime=0
    //         s1.play()
    //             break;    
    //     case 'a':
    //         s1.currentTime=0
    //         s1.play()
    //         break;    
    // }
    // console.log(key)
    // s1.currentTime=0
    // s1.play()
    