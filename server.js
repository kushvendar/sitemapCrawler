const express = require('express')
const mongoose = require('mongoose')
const { router, crawlPage } = require('./routes/crawlRoute')
const MONGO_URI = process.env.MONGO_URI 
const app = express()
app.use(express.json())

// connecting to db


async function  connectDB() {
    
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Mongo Db connected')
    } catch (error) {
        console.log(error.message)
    }

}

connectDB()


app.use('/api', router)


// to start crawling sitemap

app.get('/',async(req,res)=>{
    // const url = req.query.url
    const page = await crawlPage('https://www.edzy.ai/sitemap.xml')
    res.json({
        message:"crawled the url",
        page
    })

})


app.listen(3000,()=>{
    console.log('sever is running on port 3000')
})