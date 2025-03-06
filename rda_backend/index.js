import express from 'express'
import cors from 'cors'
import notasRouter from './src/routes/notas.routes.js'
import userRouter from './src/routes/user.routes.js'
import dotenv from 'dotenv'
import docRouter from './src/routes/doc.routes.js'
import './src/script/seed.js'

dotenv.config()


const app = express()

const PORT = process.env.PORT || 8080


const opcionesCors = {
    origin: process.env.FRONTEND_URL,
    credentials: true 
};

app.use(cors(opcionesCors))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/upload", express.static("src/middlewares/upload"))
app.use("/", notasRouter)
app.use("/", userRouter)
app.use("/", docRouter)

app.get("/", (req,res) => {
    res.json("Index")

})

app.listen(PORT, () =>  { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})