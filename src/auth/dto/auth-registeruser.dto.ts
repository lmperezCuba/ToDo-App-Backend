import {IsString, MinLength, MaxLength, Matches, IsEmail, IsInt} from "class-validator";
import {Field, InputType} from 'type-graphql';

@InputType()
export class AuthRegisteruserDto {
   @IsString()
   @MinLength(6)
   @MaxLength(20)
   @Matches(/^[a-z0-9]+([._][a-z0-9]+)*$/i)
   @Field()
   username: string;

   @IsEmail()
   @Field()
   email: string;

   @IsString()
   @MinLength(4)
   @MaxLength(20)
   @Field()
   firstname: string;

   @IsString()
   @MinLength(4)
   @MaxLength(20)
   @Field()
   lastname: string;

   @IsInt()
   @Field()
   id_structure: number;

   @IsString()
   @MinLength(8)
   @MaxLength(20)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
   @Field()
   password: string;
}