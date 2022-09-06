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

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criaJogadorDto: CriarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criaJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
      return this.jogadoresService.consultarTodosJogadores(); 
  }

  @Get('/:_id')
  async consultarJogadorPeloID(
    @Param('_id', JogadoresValidacaoParametrosPipe) '_id': string,
  ): Promise<Jogador> {
      return this.jogadoresService.consultarJogadoresPeloID(_id); 
  }

  @Delete('/:id')
  async removerJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void | NotFoundException> {
    return this.jogadoresService.removerJogador(_id);
  }
}
