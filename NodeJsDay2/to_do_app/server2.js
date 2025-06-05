const https = require('http')

const server1 = https.createServer((req,res)=>{
    res.end("server is running brother😍")
})

server1.listen(5010,()=>{
    console.log('server is listening');
})