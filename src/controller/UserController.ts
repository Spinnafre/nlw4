import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UserRepository'

import * as yup from 'yup'
import {AppError} from '../errors/AppError'


class UserController{
    async create(req:Request,res:Response){
        const {name,email}=req.body

        const schema=yup.object().shape({
            name:yup.string().required("Nome é obrigatório"),
            email:yup.string().email().required("Email incorreto")
        })

        // if(!(await schema.isValid(req.body))){
        //     return res.status(400).json({error:"Falha ao digitar nomes do usuário"})
        // }

        // Valida e mostra no error todas as validações
        await schema.validate(req.body,{abortEarly:false}).catch(err=>{
            // throw new AppError("Falha ao digitar nomes do usuário")
            return res.status(400).json({error:"Falha ao digitar nomes do usuário, error: ",err})
        })

        // Permite a manipulação dos dados
        const UserRepository=getCustomRepository(UsersRepository)

        const alreadExists=await UserRepository.findOne({email})
        if(alreadExists){
            return res.status(400).send({error:"Usuário já existe"})
        }
        const user=UserRepository.create({
            name,email
        })

        await UserRepository.save(user)

        return res.status(201).send(user)
    }
}

export { UserController }
