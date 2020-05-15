require("dotenv").config({ path: 'ENV_FILENAME' })
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const cors = require("cors")

const app = express()


const MONGODB_URI = env.NODE_ENV 
 

mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true,  useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("Connected to familyblog")
        } else {
            console.log("Error connecting: ", err)
        }
    }
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    // queries database, responds with the json
    // Render ^ to react component
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use(cors())
app.use('/articles', articleRouter)
app.listen(5000)