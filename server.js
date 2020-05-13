const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const cors = require("cors")
const app = express()


mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true,  useUnifiedTopology: true 
})

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