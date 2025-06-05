const fs = require('fs')
const readStream = fs.createReadStream('./hello.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./hola.txt', { encoding: 'utf8' })

readStream.on('data', (data) => {
    console.log(data);

    writeStream.write(data, (err) => {
        if (err) {
            throw Error('Error', err)
        }
    })
})

readStream.on('error', (err) => {
    throw Error('Error: ', err)
})

writeStream.on('error', (err) => {
    console.log(err);
})

readStream.on('end', () => {
    console.log('reading ended');
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('succeessfuly written');
})