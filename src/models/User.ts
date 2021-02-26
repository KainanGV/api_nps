import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

//Notation para definir este model User como tabela lá no nosso driver do db
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createAt: Date;

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {User};