import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from '../models/SurveyUser';

@EntityRepository(SurveysUsers)
class SurveysUsersRepository extends Repository<SurveysUsers>{

}

export { SurveysUsersRepository };
