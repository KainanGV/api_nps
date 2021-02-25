import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

//Notation para definir este model User como tabela lá no nosso driver do db
@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createAt: Date
}

export {User};