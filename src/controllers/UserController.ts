import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request:Request, response:Response) {
        const {name, email} = request.body

        // Verify
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio"),
            email: yup.string().email().required("Email incorreto")
        })

        try {

            await schema.isValid(request.body, {abortEarly: false})

        }catch(err) {
            return response.status(400).json({error: err})
        }

        // Para cada operação que será realizada no banco, usa o getRepository, para criar um repositorio da minha entidade passada como parâmetro
        const usersRepository = getCustomRepository(UsersRepository) // pegando nosno repository da camdada repository

        const userAlereadyExists = await usersRepository.findOne({
            email
        })

        if(userAlereadyExists) {
            throw new AppError("User already exists")
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
