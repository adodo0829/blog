let Promise =  require('./promise')

let p = new Promise((resolve, reject) => {
    console.log('my promise')
    setTimeout(() => {
        resolve('success')
    }, 1000);
})

p.then(res => {
    console.log(res)
}, rej => {
    console.log(rej)
})