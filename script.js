const i1 = document.querySelector('#inp1');
const i2 = document.querySelector('#inp2');
const i3 = document.querySelector('#inp3');
const i4 = document.querySelector('#inp4');
const btn = document.querySelector('#btn');

const wynik = document.querySelector('.wynik')



wynik.textContent = i1.value

const przeliczBtn = document.querySelector('#btn')


document.addEventListener('change', ()=>{

    
    const min = Math.min(i1.value,i2.value,i3.value,i4.value)
    const max = Math.max(i1.value,i2.value,i3.value,i4.value)

    
    const sum = (parseFloat(i1.value)+parseFloat(i2.value)+parseFloat(i3.value)+parseFloat(i4.value))
    const avg = (parseFloat(i1.value)+parseFloat(i2.value)+parseFloat(i3.value)+parseFloat(i4.value))/4

   

    const p1=document.createElement("p")
    const p2=document.createElement("p")
    const p3=document.createElement("p")
    const p4=document.createElement("p")

    p1.textContent="min: " +min
    p2.textContent="max: " +max
    p3.textContent="avg: " +avg
    p4.textContent="sum: " +sum

    document.removeChild(wynik)
    wynik.appendChild(p1)
    wynik.appendChild(p2)
    wynik.appendChild(p3)
    wynik.appendChild(p4)




})