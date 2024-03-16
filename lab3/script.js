// const s1=document.querySelector('#sound1');
// const s2=document.querySelector('#sound2');
// const s3=document.querySelector('#sound3');
// const s4=document.querySelector('#sound4');

const sounds={
    'a':document.querySelector('#sound1'),
    's':document.querySelector('#sound2'),
    'd':document.querySelector('#sound3'),
    'f':document.querySelector('#sound4'),
}

const times=[]


const start = document.querySelector('#start');
const end = document.querySelector('#stop');
const time = document.querySelector('#time');
const track1 = document.querySelector('#Track1');

let startTime
let endTime
let isRecording=false
// const playTrack = document.querySelector('')


start.addEventListener('click',()=>{
    startTime = Date.now();
    isRecording=true
})

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
        
            times.push({
                key: ev.key,
                time: Date.now() - startTime
            })
            const sound = sounds[key]
            sound.currentTime = 0
            sound.play()
            
        }
    })    

console.log(times)


addEventListener



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
