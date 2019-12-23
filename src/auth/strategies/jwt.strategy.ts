import {Strategy, ExtractJwt} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstants} from "./jwt.constants";
import {JwtPayload} from "../jwt-payload.interface";
import {UserService} from "../users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user = await this.usersService.findOnebyUsername(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
