import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        })
    ],
    providers: [Bcrypt, JwtStrategy], //falta authservice e localstrategy
    controllers: [], // falta authcontroller
    exports: [Bcrypt]
    
})

export class AuthModule{}