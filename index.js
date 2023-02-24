import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/User.js'
import authRoutes from './routes/Auth.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const CURRENT_WORKING_DIR = process.cwd()
const app = express()
// enable CORS - Cross Origin Resource Sharing
// app.use(cors())
app.use(cors({credentials: true, origin: ["http://localhost:3000", "http://localhost:3000/signin" ]}));

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())



app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

///Env
dotenv.config();
// port
const PORT = process.env.PORT || 8080


/////
app.get('/', (req, res) => {
    res.send("<h2>Hello <a href='/starr'>starr</a></h2>")
})
app.get('/starr', (req, res) => {
    res.status(200).send('template()')
})

///connect to Database
mongoose.set('strictQuery', false);

main().catch(err => console.log(err)).then(()=>{console.log("connected")});
async function main() {
  await mongoose.connect(process.env.mongourl);
}


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})
