import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
            TYPEORM_HOST: Joi.string().default('localhost'),
            TYPEORM_PORT: Joi.number().default(5432),
            TYPEORM_DATABASE: Joi.string().required(),
            TYPEORM_USERNAME: Joi.string().required(),
            TYPEORM_PASSWORD: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
            TYPEORM_CONNECTION: Joi.string().default('postgres'),
            TYPEORM_ENTITIES: Joi.string().required(),
            TYPEORM_MIGRATIONS: Joi.string().required(),
            TYPEORM_MIGRATIONS_DIR: Joi.string().default('src/migrations'),
            TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().default('migrations'),
            TYPEORM_LOGGING: Joi.string(),
            TYPEORM_LOGGER: Joi.string(),
            TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
            TYPEORM_MIGRATIONS_RUN: Joi.boolean().required(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    /*For each config property, we have to add a getter function.*/
    get(key: string): string {
        return this.envConfig[key];
    }

}
