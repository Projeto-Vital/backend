import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_categorias'})
export class Categoria{

    @PrimaryGeneratedColumn()
    id:number;

    @Transform(({value}:TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255})
    categoria:string;

    @Column({length:255})
    descricao:string;
}