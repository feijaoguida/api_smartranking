import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email });

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jodador com e-mail ${email} não encontrado`)
    } 
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
    
  }

  async atualizarJogador(_id: string, criaJogadorDto: CriarJogadorDto): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }

    await this.jogadorModel.findOneAndUpdate({ _id }, { $set: criaJogadorDto });
    
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find();
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async removerJogador(email: string): Promise<any> {
    return await this.jogadorModel.findOneAndDelete({ email });
  }
}
