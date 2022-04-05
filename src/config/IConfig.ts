import { ISwaggerDefinition } from '../documentation/swagger/Swagger';

export interface IConfig extends ISwaggerDefinition {
  env: string;
  apiPrefix: string;
  port: string;
  corsOrigin: string;
  mongo: string;
  mongooseDebug: boolean;
  swaggerUrl: string;
  redisPort: string;
  redisHost: string;
  secret:string;
}
