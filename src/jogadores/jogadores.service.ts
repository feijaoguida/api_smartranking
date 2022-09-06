import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email });
    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
    } 
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
    
  }

  async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
    this.verificaJodadorExiste(_id)
    await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto });
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find();
  }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return jogadorEncontrado;
  }

  async removerJogador(_id: string): Promise<any> {
    this.verificaJodadorExiste(_id)
    return await this.jogadorModel.findOneAndDelete({ _id });
  }

  async verificaJodadorExiste(_id: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
  }
}
