import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {UserRepository} from "./user.repository";

/**
 * In a real app, this is where you'd build your user model and persistence layer,
 * using your library of choice (e.g., TypeORM, Sequelize, Mongoose, etc.).
 */

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository)
                private readonly userRepository: UserRepository) {
    }

    async findOnebyUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}});
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async saveUser(user: User) : Promise<void> {
        await this.userRepository.save(user);
    }
}
