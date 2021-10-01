// let feedback = (callback)=>{
//     setTimeout(() => {
//         callback("callback");
//     }, 2000);

// }

// setTimeout(() => {
//     console.log("timmer started");
//     feedback((s)=>{
//         console.log(s);
//         })
        
// }, 2000);
    
let feedback = callback=>{
    let promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
                    resolve("callback");
                }, 2000);
    });
    return promise;
}


setTimeout(() => {
    console.log("timmer started");
    feedback()
    .then((s)=>{
            console.log(s);
            return feedback();

    }).then((d)=>{
        console.log('g '+d );
    })
        
}, 2000);


console.log("hello");
console.log("hi");