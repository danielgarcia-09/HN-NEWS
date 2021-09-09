import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(){
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if( isDevelopmentEnv ){
            
            const envFilePath = 'apps/api/.env';
            const existsPath = fs.existsSync(envFilePath);

            if( !existsPath ) {
                console.log(envFilePath);
                process.exit(0);
            }
            
            this.envConfig = parse(fs.readFileSync(envFilePath));
        
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            };
        }
    }

    get( key: string ): string {
        return this.envConfig[key];
    }
}
