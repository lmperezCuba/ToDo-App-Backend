import {IsString, MinLength, MaxLength, Matches} from "class-validator";
import {Field, InputType} from 'type-graphql';

@InputType()
export class AuthCredentialsDto {
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   @Field()
   username: string;

   @IsString()
   @MinLength(8)
   @MaxLength(20)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
   @Field()
   password: string;
}