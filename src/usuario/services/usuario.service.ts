import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioReposity: Repository<Usuario>,
        private bcryp: Bcrypt
    ){}

    async findByUsuario(usuario:string): Promise<Usuario | undefined> {
        return await this.usuarioReposity.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll() : Promise<Usuario[]> {
        return await this.usuarioReposity.find({
            relations:{
                produto: true
            }
        });
    }

    async findById(id:number): Promise<Usuario> {
        let usuario = await this.usuarioReposity.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });

        if(!usuario) 
            throw new HttpException("Usuário não encontrado",HttpStatus.NOT_FOUND);

        return usuario
    }

    async create(usuario: Usuario): Promise<Usuario> {

        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!buscaUsuario) {
            usuario.senha = await this.bcryp.criptografarSenha(usuario.senha);
            return await this.usuarioReposity.save(usuario);
        }
        throw new HttpException ("Usuário já cadastrado!", HttpStatus.BAD_REQUEST)
    }

    async update(usuario:Usuario): Promise<Usuario> {

        let updateUsuario : Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcryp.criptografarSenha(usuario.senha);
        return await this.usuarioReposity.save(usuario);

    }
}