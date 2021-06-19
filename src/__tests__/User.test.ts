// SuperTest é usado para simular um servidor iniciado
import request from 'supertest'
import {app} from '../app'
import createConnection from "../database"
import { getConnection } from 'typeorm'

describe('Users',()=>{
    beforeAll(async()=>{
        const connection=await createConnection();
        await connection.runMigrations();
    })
    afterAll(async()=>{
        const connection=getConnection()
        await connection.dropDatabase()
        await connection.close()

    })
    // Faz a requisição ao meu servidor para testes
    it('Should be able to create a new user',async ()=>{
        const resp=await request(app).post('/users').send({email:"davi@gmail.com",name:"Davi"})
        expect(resp.status).toBe(201)
    })

//     it('Should not be able to create a new user with exist email',async ()=>{
//         const resp=await request(app).post('/users').send({email:"davi@gmail.com",name:"Davi"})
//         expect(resp.status).toBe(400)
//     })
})
