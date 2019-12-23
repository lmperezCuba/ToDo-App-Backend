import {Query, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Args} from "@nestjs/graphql";
import {User} from "./users/user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {Mutation} from "type-graphql";
import {UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {AuthRegisteruserDto} from "./dto/auth-registeruser.dto";
import {AuthGuard} from "@nestjs/passport";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Query(() => User)
    ///@UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async createUser(@Args({
        name: 'registeruserdata',
        type: () => AuthRegisteruserDto
    }) authregisteruserdto: AuthRegisteruserDto): Promise<User> {
        return await this.authService.signUp(authregisteruserdto);
    }

    @Query(() => String)
    async loginUser(@Args({
        name: 'usernamepassword',
        type: () => AuthCredentialsDto
    }) authcredentialsdto: AuthCredentialsDto): Promise<string> {
        return await this.authService.signIn(authcredentialsdto);
    }
}
