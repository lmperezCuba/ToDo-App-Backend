import {IsEmail} from "class-validator";
import { Exclude } from "class-transformer";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@ObjectType()
@Entity({name: 'user'})
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', unique: true})
    username: string;

    @Column({type: 'varchar'})
    @IsEmail()
    email: string;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @Column({type: 'varchar'})
    @Exclude()
    password: string;

    confirmPassword: string;

    @Column({type: 'boolean', default: true})
    active: boolean;

    @CreateDateColumn()
    created_At: Date;

    @Column({type: 'simple-array', nullable: true})
    tokens: object[];

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    async encryptPassword(): Promise<void> {
        this.password = await bcrypt.hashSync(this.password, 12);
    }

}
