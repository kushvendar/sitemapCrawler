const express = require('express')

const app = express()



app.get('/',(req,res)=>{
    res.send('hi from the server')
})


app.listen(3000,()=>{
    console.log('sever is running on port 3000')
})