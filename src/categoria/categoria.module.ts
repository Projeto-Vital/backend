import { Module } from "@nestjs/common";
import { Categoria } from "./entities/categoria.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaController } from "./controller/categoria.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [CategoriaService],
    exports:[TypeOrmModule]
  })
  export class CategoriaModule {}