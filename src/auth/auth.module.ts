import { AuthController } from './controllers/auth.controller';
import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        })
    ],
    providers: [Bcrypt,JwtStrategy,AuthService,LocalStrategy], 
    controllers: [AuthController], 
    exports: [Bcrypt]
    
})

export class AuthModule{}