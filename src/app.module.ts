import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rbgsolucoes:Feijao123@apismart.n21x97a.mongodb.net/apismart?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
