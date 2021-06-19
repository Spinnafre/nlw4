import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController{
    // http://localhost:333/answers/2?u=75856990-3256-496c-8500-d017abbe6126
    async execute(req:Request,res:Response) {
        const {value}=req.params
        const {u}=req.query

        const surveyUserRepository=getCustomRepository(SurveysUsersRepository)

        const userSurvey=await surveyUserRepository.findOne({
            id:String(u)
        })
        if(!userSurvey){
            throw new AppError("Survey user does not exists")
            // return res.status(400).json({error:"Survey user does not exists"})
        }

        userSurvey.value=Number(value)
        await surveyUserRepository.save(userSurvey)
        return res.status(200).json(userSurvey)

    }
}

export { AnswerController };

