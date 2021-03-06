import {Request, Response} from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import * as yup from 'yup';

class NpsController {
    async execute(request: Request, response: Response) {
        const {survey_id} = request.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        // Calculate NPS
        const detractor = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6)

        const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10)

        const passive = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8)

        const totalAnswers = surveysUsers.length

        const calculate = Number((((promoters.length - detractor.length) / totalAnswers) * 100).toFixed(2))

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps : calculate
        })
    }
}

export {NpsController}