import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Produto } from './produto/entities/produto.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_projeto_integrador',
      entities: [Categoria, Produto, Usuario],
      synchronize: true,
      logging: true 
    }),
    CategoriaModule,
    ProdutoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
