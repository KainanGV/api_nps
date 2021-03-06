import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    //Faz referência ao relacionamento envolvido entre as tabelas, assim retornando um inner join
    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user:User;

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey;

    @Column()
    value: number

    @CreateDateColumn()
    createAt: Date;

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {SurveyUser}