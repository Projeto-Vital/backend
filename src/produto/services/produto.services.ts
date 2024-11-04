import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}
  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
        usuario: true
      },
      select: {
        usuario:{
          id:true,
          nome:true,
          usuario:true,
          foto: true,
          tipo:true
        }
      }
    });
  }

  async findById(id: number): Promise<Produto> {
    let buscaProduto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        usuario: true
      },
      select: {
        usuario:{
          id:true,
          nome:true,
          usuario:true,
          foto: true,
          tipo:true
        }
      }
    });

    if (!buscaProduto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return buscaProduto;

  }

  async findByNome(nome: string): Promise<Produto[]> {
    let buscaNome = await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
        usuario: true
      },
      select: {
        usuario: {
          id:true,
          nome:true,
          usuario:true,
          foto: true,
          tipo:true
        }
      }
    });
    return buscaNome;
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    let buscaProduto = await this.findById(produto.id);
    if (!buscaProduto || !produto.id)
      throw new HttpException(
        'O Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaProduto = await this.findById(id);
    if (!buscaProduto)
      throw new HttpException(
        'Postagem não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return await this.produtoRepository.delete(id);
  }
}
