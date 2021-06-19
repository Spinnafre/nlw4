import express,{NextFunction, Request,Response} from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import connection from "./database"
import {router} from './routes'
import { AppError } from './errors/AppError'


// chama a função que está no index.ts
connection()
const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(router)

app.use((err:Error,req:Request,resp:Response,_next:NextFunction)=>{
    if(err instanceof AppError){
        return resp.status(err.statusCode).json({
            message:err.message
        })
    }
    return resp.status(500).json({
        status:'Error',
        message:`Internal server error ${err.message}`
    })
})

export {app}