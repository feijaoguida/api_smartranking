import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
      return this.jogadoresService.consultarTodosJogadores(); 
  }

  @Get('/:_id')
  async consultarJogadorPeloID(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
      return this.jogadoresService.consultarJogadoresPeloId(_id); 
  }

  @Delete('/:_id')
  async removerJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void | NotFoundException> {
    return this.jogadoresService.removerJogador(_id);
  }
}
