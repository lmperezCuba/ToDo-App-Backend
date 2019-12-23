import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {UserService} from './users/user.service';
import {User} from "./users/user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthenticationError} from "apollo-server-errors";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import {AuthRegisteruserDto} from "./dto/auth-registeruser.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private jwtService: JwtService
    ){}

    async signUp(authregisteruserdto: AuthRegisteruserDto): Promise<User> {
        const {username, email, firstname, lastname, id_structure, password} = authregisteruserdto;
        const user = new User();
        user.username = username;
        user.email = email;
        user.firstName = firstname;
        user.lastName = lastname;
        user.password = password;
        try {
            await this.usersService.saveUser(user);
            return user;
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('El nombre de usuario ya esta registrado');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    /**
     * Local strategy. Use bcrypt for compare encripting.
     * @param authcredentialsdto
     */
    async signIn(authcredentialsdto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authcredentialsdto;
        const user = await this.usersService.findOnebyUsername(username);
        if (!user || !await user.validatePassword(password))
        throw new AuthenticationError('Credenciales incorrectas.');

        const firstname = user.firstName;
        const email = user.email;
        const lastname = user.lastName;
        
        const payload: JwtPayload = {username, email, firstName, lastName};
        return await this.jwtService.sign(payload);
    }
}
