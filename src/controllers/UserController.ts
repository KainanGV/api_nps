import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    async create(request:Request, response:Response) {
        const {name, email} = request.body
        
        // Para cada operação que será realizada no banco, usa o getRepository, para criar um repositorio da minha entidade passada como parâmetro
        const usersRepository = getCustomRepository(UsersRepository) // pegando nosno repository da camdada repository

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

export { UserController };
