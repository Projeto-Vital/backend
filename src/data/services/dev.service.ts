import { Injectable } from "@nestjs/common";
import { Produto } from "../../produto/entities/produto.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_projeto_integrador',
            entities: [Produto, Usuario, Categoria],
            synchronize: true,
    };
  }
}