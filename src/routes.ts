import {Router} from 'express'
import {UserController} from './controller/UserController'
import {SurveysController} from './controller/SurveysController'
import {sendMailController} from './controller/sendMailController'
import {AnswerController} from './controller/AnswerController'
import {NpsController} from './controller/NpsController'

const router=Router()

const userController=new UserController()
const surveyController=new SurveysController()
const sendMailControl=new sendMailController()
const answerController=new AnswerController()
const npsController=new NpsController()
// router.get()
router.post('/users',userController.create)
router.post('/surveys',surveyController.create)
router.post('/sendMail',sendMailControl.execute)
router.get('/get-surveys',surveyController.show)
router.get('/answer/:value',answerController.execute)
router.get('/nps/:survey_id',npsController.execute)


export {router}