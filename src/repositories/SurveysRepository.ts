import { Entity, EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

// Definição desta classe como repository
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {
    
}

export {SurveysRepository}