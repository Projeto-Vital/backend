import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./services/produto.services";
import { CategoriaService } from "../categoria/services/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers: [ProdutoService, CategoriaService],
    controllers: [],
    exports:[TypeOrmModule],
})
export class ProdutoModule {}