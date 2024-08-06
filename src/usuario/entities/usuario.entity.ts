import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    nome: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    usuario: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    senha: string;

    @Column()
    @ApiProperty() 
    foto: string;

    @IsNotEmpty()
    @Column()
    @ApiProperty() 
    tipo: number;

    @ApiProperty({type:() => Produto}) 
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto;
}