import { Request, Response } from "express";
import { getCustomRepository,Not,IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController{
    // Detratores => 0 - 6
    // Passivos => 7- 8
    // Promotores => 9 - 10
    // (n° promotores - número de defratores)/( n° de respondentes )* 100

    async execute(req:Request,res:Response) {
        const {survey_id}=req.params

        const surveysUsersRepository=getCustomRepository(SurveysUsersRepository)
        
        const surversUsers=await surveysUsersRepository.find({
            survey_id,
            value:Not(IsNull())
        })
        const distractor= surversUsers.filter(survey=>{
            return survey.value>=0 && survey.value<=6
        }).length
        
        const promoters= surversUsers.filter(survey=>{
            return survey.value>=9 && survey.value<=10
        }).length
        const passives= surversUsers.filter(survey=>{
            return survey.value>=7 && survey.value<=8
        }).length

        const totalAnswers=surversUsers.length

        const calc=Number((((promoters-distractor)/totalAnswers)*100).toFixed(2))

        return res.status(200).json({
            distractor,
            promoters,
            passives,
            respostas: totalAnswers,
            nps:calc
        })
    }
}

export { NpsController };
