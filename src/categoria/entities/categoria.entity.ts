import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'tb_categorias'})
export class Categoria{

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id:number;

    @Transform(({value}:TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255})
    @ApiProperty() 
    categoria:string;

    @Column({length:255})
    @ApiProperty() 
    descricao:string;
    
    @ApiProperty({type:() => Produto}) 
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];

}