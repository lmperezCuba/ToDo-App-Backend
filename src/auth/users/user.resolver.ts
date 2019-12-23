import {Args, Query, Resolver} from '@nestjs/graphql';
import { ArgumentValidationError } from "type-graphql";
import {User} from './user.entity';
import {UserService} from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Query(() => User)//, { nullable: true }
    getUserbyUsername(@Args('username') username: string): Promise<User> {
        try {
            return this.userService.findOnebyUsername(username);
        } catch (error) {
            throw new ArgumentValidationError(error.message);
        }


    }

    @Query(() => [User])
    async getAllUsers() {
        return this.userService.findAll();
    }

}
