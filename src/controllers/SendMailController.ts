import {Request, Response} from 'express';
import {resolve} from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';


class SendMailController {
    async execute(request: Request, response:Response) {
        const {email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists"
            })
        }

        const surveysAlreadyExists = await surveysRepository.findOne({
            id:survey_id
        })

        if(!surveysAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists"
            })
        }

        
        // Definição do caminho por meio do path do nosso template personalizado
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        //Após setar nosso relacionamento utilizando a claúsula relations ele retorn o user_id e o survey_id semelhante ao inner join
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null},
            relations: ["user", "survey"]
        })

        const variables = {
            name: userAlreadyExists.name,
            title: surveysAlreadyExists.title,
            description: surveysAlreadyExists.description,
            id: "",
            link: process.env.URL_MAIL
        }


        // Verificação para a table surveyUser 
        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id
            SendMailService.execute(email, surveysAlreadyExists.title, variables, npsPath)
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: survey_id
        })

        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id

        await SendMailService.execute(email, surveysAlreadyExists.title, variables, npsPath)
        
        return response.json(surveyUser)

    }

}

export {SendMailController}