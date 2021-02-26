import {Request , Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request:Request, response:Response) {
        const {name, email} = request.body
        
        // Para cada operação que será realizada no banco, usa o getRepository, para criar um repositorio da minha entidade passada como parâmetro
        const usersRepository = await getRepository(User)

        const userAlereadyExists = await usersRepository.findOne({
            email
        })

        if(userAlereadyExists) {
            return response.status(400).json({
                error: "User already exists"
            })
        }

        // Este retorna uma promises de user, com isso já consigo dar um save no db
        const user = usersRepository.create({
            name,email
        })


        await usersRepository.save(user);

        return response.json(user);
        
    }
}

export {UserController}