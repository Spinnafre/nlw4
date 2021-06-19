import { Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity('surveys')
class Surveys{
    @PrimaryColumn()
    readonly id:string
    @Column()
    title:string
    @Column()
    description:string
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

export {Surveys}