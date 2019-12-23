import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {jwtConstants} from "./strategies/jwt.constants";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: 3600,
            }
        }),
        UsersModule,
        RolesModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {
}
