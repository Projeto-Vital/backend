import { Module } from "@nestjs/common";
import { Categoria } from "./entities/categoria.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "./services/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [],
    providers: [CategoriaService],
    exports:[TypeOrmModule]
  })
  export class CategoriaModule {}