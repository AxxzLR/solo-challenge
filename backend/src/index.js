const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//#region settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)
//#endregion

//#region middlewares
// app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})
//#endregion

//routes
app.use('/api/todos', require('./routes/index'))

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})