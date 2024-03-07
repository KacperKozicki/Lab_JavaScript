// const img1 = new Image()
// const img2 = new Image()
// const img3 = new Image()
// const img4 = new Image()
// const img5 = new Image()

// img1.src="https://source.unsplash.com/3tYZjGSBwbk";
// img1.classList.add('imag');
const slider = document.querySelector('.slider');
// setTimeout(
//     ()=>{
//         console.log('asdaf')
//         const box = document.querySelector('#slider-inner')
//         box.style.transform='translateX(100px)'
//     }, 2_000)

let positionX = 0
const animat = setInterval(
    ()=>{
        const box = document.querySelectorAll('.slider-box')
        box.forEach(element => {
            element.style.transform=`translateX(${positionX}px)`
        positionX++
        });
        

        
    }, 8)

setTimeout(()=>{
    clearInterval(animat)
},3_000)
