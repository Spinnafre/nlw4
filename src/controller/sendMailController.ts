import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UserRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import EmailService from '../services/sendEmailService'
import path from 'path'


class sendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const UserRepository = getCustomRepository(UsersRepository)
        const SurveyRepository = getCustomRepository(SurveysRepository)
        const SurveyUserRepository = getCustomRepository(SurveysUsersRepository)

        const user = await UserRepository.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "Usuário não existe" })

        }

        const surveys = await SurveyRepository.findOne({ id: survey_id })

        const npsPathTemplate = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')



        if (!surveys) {
            return res.status(400).json({ error: "Pesquisa não existe" })

        }

        const surveysAlreadyExists = await SurveyUserRepository.findOne({
            // OR
            // where:[{survey_id:surveys.id},{value:null}],
            // AND
            where: { survey_id: surveys.id, value: null },
            relations: ["users", "surveys"]
        })
        const variables = {
            name: user.name,
            title: surveys.title,
            description: surveys.description,
            id: "",
            link: process.env.URL_MAIL
        }
        if (surveysAlreadyExists) {
            variables.id=surveysAlreadyExists.id
            await EmailService.execute(email, surveys.title, variables, npsPathTemplate)
            return res.status(200).json(surveysAlreadyExists)
        }

        const surveyUser = SurveyUserRepository.create({
            user_id: user.id,
            survey_id
        })

        await SurveyUserRepository.save(surveyUser)

        variables.id=surveyUser.id
        await EmailService.execute(email, surveys.title, variables, npsPathTemplate)

        return res.status(201).json(surveyUser)
    }

}

export { sendMailController }