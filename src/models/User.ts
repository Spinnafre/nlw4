import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

// Diz que a classe irá ser tratada como uma entidade do banco de dados
@Entity("users")
class User {

    @PrimaryColumn()
    // Não alterável
    readonly id:string
    @Column()
    name:string
    @Column()
    email:string
    @CreateDateColumn()
    created_at:Date

    constructor(){
        // Se por acaso eu estiver editando então a entidade irá ter o valor
        // de UUID
        if(!this.id){
            this.id=uuid()
        }
    }
}

export { User };
