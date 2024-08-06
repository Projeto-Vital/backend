import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_produtos'})
export class Produto {
    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false})
    @ApiProperty() 
    nome: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false})
    @ApiProperty() 
    descricao: string;

    @IsNumber({maxDecimalPlaces:2})
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2})
    @ApiProperty() 
    preco: number;

    @IsNotEmpty()
    @Column()
    @ApiProperty() 
    foto: string;

    @ApiProperty({type:() => Categoria}) 
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE',
    })
    categoria: Categoria;

    @ApiProperty({type:() => Usuario}) 
    @ManyToOne(() => Usuario, (usuario) => usuario.produto)
    usuario: Usuario
 }







