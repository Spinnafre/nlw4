import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import {v4 as uuid} from 'uuid'
import { Surveys } from "./Surveys";
import { User } from "./User";

@Entity('surveys_users')
class SurveysUsers{
    @PrimaryColumn()
    readonly id:string
    @Column()
    user_id:string

    @ManyToOne(()=>User)
    @JoinColumn({name:"user_id"})
    users:User

    @Column()
    survey_id:string

    @ManyToOne(()=>Surveys)
    @JoinColumn({name:"survey_id"})
    surveys:Surveys

    @Column()
    value:number
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

export {SurveysUsers}