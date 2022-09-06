import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { JogadorSchema } from './schema/jogador.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]) ],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
