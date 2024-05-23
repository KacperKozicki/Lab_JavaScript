
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

const keys = [
    {key: 'a', selector: document.querySelector('#a')},
    {key: 's', selector: document.querySelector('#s')},
    {key: 'd', selector: document.querySelector('#d')},
    {key: 'f', selector: document.querySelector('#f')},
    {key: 'g', selector: document.querySelector('#g')},


    {key: 'z', selector: document.querySelector('#z')},
    {key: 'x', selector: document.querySelector('#x')},
    {key: 'c', selector: document.querySelector('#c')},
    {key: 'v', selector: document.querySelector('#v')},

]
const times = [];//tablica tablic obiektów dla każdej ścieżki - własna tablica a wniej obiekt 
const addTrackButton = document.querySelector('#addTrack');
const tracksContainer = document.querySelector('#tracks');

addTrackButton.addEventListener('click', addTrack);

function addTrack() {
    const id = times.length;
    times.push([]); 

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = `track${id}`;
    newCheckbox.value = `track${id+1}`;
    newCheckbox.className = 'chip';
    newCheckbox.role = 'switch';

    const looper = document.createElement('input');
    looper.type = 'checkbox';
    looper.id = `loop${id}`;
    looper.value = `loop`;
   

    const looperLabel = document.createElement('label');
    looperLabel.htmlFor = `loop${id}`;

    //słuchamy czy wyłączone /włączone loopowanie dla tracka
    looper.addEventListener('change', (e) => {
        if (!e.target.checked) {
            stopLooping(id); 
        }
    });

    tracksContainer.appendChild(newCheckbox);
    tracksContainer.appendChild(looper);
    tracksContainer.appendChild(looperLabel);
}




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
        
let loopIntervals = {};
function stopLooping(id) {
    if (loopIntervals[id]) {
        clearInterval(loopIntervals[id]);
    }
}
    


const play = document.querySelector('#play');

let startTime
let endTime
let isRecording=false
let currentTrackIndex;
let loopInterval; 
let recordingStartTime;
let maxTrackLength = 0; 
const playTrack = document.querySelector('#time')

//odpalamy scieżke po checkboxie
// play.addEventListener('click', () => {
//     checkbox.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//             playTracks(times[index]);
//         }
//     });
// });

// function playTracks(timesArray) {
//     timesArray.forEach(element => {
//         const soundToPlay = sounds[element.key];
//         if (soundToPlay) {
//             setTimeout(() => {
//                 soundToPlay.currentTime = 0;
//                 soundToPlay.play();
//             }, element.time);
//         }
//     });
// }
function playTracks() {
    times.forEach((track, index) => {
        const trackCheckbox = document.getElementById(`track${index}`);
        const loopCheckbox = document.getElementById(`loop${index}`);
        if (trackCheckbox.checked) {
            track.forEach(note => {
                setTimeout(() => {
                    const soundToPlay = sounds[note.key];
                    if (soundToPlay) {
                        soundToPlay.currentTime = 0;
                        soundToPlay.play();

                        if (loopCheckbox.checked) {
                            setInterval(() => {
                                soundToPlay.currentTime = 0;
                                soundToPlay.play();
                            }, track.reduce((acc, curr) => Math.max(acc, curr.time), 0) + 1000); 
                        }
                    }
                }, note.time);
            });
        }
    });
}

play.addEventListener('click', () => playTracks(tykacz.checked));

let stoper;

//nagrywaj
start.addEventListener('click',()=>{
    recordingStartTime = Date.now();
    isRecording = true;

    const checkboxes = tracksContainer.querySelectorAll('input[type="checkbox"]');
    currentTrackIndex = Array.from(checkboxes).findIndex(checkbox => checkbox.checked);
    times[currentTrackIndex] = [];
    
})

//koniec nagrania - czas
end.addEventListener('click',()=>{
    isRecording = false;
    const recordingEndTime = Date.now();
    const recordingLength = recordingEndTime - recordingStartTime;
    playTrack.textContent = formatTime(recordingLength);
})

//formatuj czas
function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}




addEventListener('keypress', (ev) => {
    if (isRecording && currentTrackIndex >= 0) {
        const key = ev.key;
        const sound = sounds[key];
        const keyObject = keys.find(k => k.key === key);

        if (sound && keyObject) {
            keyObject.selector.classList.add('active');
            setTimeout(() => keyObject.selector.classList.remove('active'), 100); 

            times[currentTrackIndex].push({
                key: key,
                time: Date.now() - recordingStartTime,
            });
            sound.currentTime = 0;
            sound.play();
        }
    }
});