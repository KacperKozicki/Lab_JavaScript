// // // #1

const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
  }


// // // #2
// // asyncAdd(2,3).then((result) => {
// //     console.log(result)
// // }).catch((error) => {
// //     console.log(error)
// // })

// // // #3

// async function sumNumbers(...numbers) {
//     try {
//         let sum = 0;
//         for (let number of numbers) {
//             sum = await asyncAdd(sum, number);
//         }
//         //console.log(sum);
//     } catch (error) {
//         console.log(error);
//     }
// }

async function sumArray(numbers) {
    let sum = 0;
    if (numbers.length === 1) {
        console.log(numbers[0]);
        return numbers[0]; 
    }

    const promises = [];
    for (let i = 0; i < numbers.length; i += 2) {
        if (i + 1 < numbers.length) {
            promises.push(asyncAdd(numbers[i], numbers[i + 1]));
        } else {
            promises.push(Promise.resolve(numbers[i]));
        }
    }

    const results = await Promise.all(promises);

    sum = await sumArray(results);
    return sum;
}
// // // #4
// // // function time() {
// // //     const start = performance.now();
// // //     sumNumbers(1,2,3,4,5,6,7,8,9,10);
// // //     const end = performance.now();
// // //     console.log(`Execution time: ${end - start} milliseconds`);
// // // }
// // // time();

// // // #5

// // async function measurePerformance() {
// //     const start = performance.now();
// //     const numbers = Array.from({length: 100}, (_, index) => index + 1);
// //     await sumNumbers(...numbers);
// //     const end = performance.now();
// //     console.log(`Czas wykonania: ${end - start} ms`);
// //     console.log(`Liczba operacji: ${numbers.length}`);
// // }
// // measurePerformance();



// // async function measurePerformance2() {
// //     const start = performance.now();
// //     const pairs = Array.from({length: 100}, (_, index) => [index * 2 + 1, index * 2 + 2]);
// // for (let pair of pairs) {
// //     sumNumbers(...pair);
// // }

// //     const end = performance.now();
// //     console.log(`Czas wykonania: ${end - start} ms`);
// //     console.log(`Liczba operacji: ${pairs.length}`);
// // }
// // measurePerformance2();



  
async function Times() {
    const start = performance.now();
    const liczby = Array.from({length: 100}, (_, indeks) => indeks + 1);

    const suma = await sumArray(liczby);

    const end = performance.now();
    console.log(`Czas: ${end - start} ms`);
    console.log(`Suma: ${suma}`);
}



Times();
