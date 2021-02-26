import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

// Definição desta classe como repository
@EntityRepository(User)
class UsersRepository extends Repository<User> {
    
}

export {UsersRepository}