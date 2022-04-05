import { MongoMemoryServer } from 'mongodb-memory-server';
import * as supertest from 'supertest';
import config from '../../../config/configuration';
import Server from '../../../Server';
import Database from '../../../libs/database/Database';

describe('For user endpoints', () => {
    const server = new Server(config);
    let mongoServer;
    let mongoUri;
    let req;

    beforeAll(async () => {
        const app = await server.bootstrap();
        req = supertest(app);

        mongoServer = await MongoMemoryServer.create({
            instance: {
                dbName: 'users-exp-boiler',
            },
        });
        mongoUri = mongoServer.getUri();
        await Database.open(mongoUri);
    });
    //* *** Positive Test Cases ****/

    describe('Test case for registration of new user', () => {
        test('Registration of new user', async () => {
            const res = await req.post('/api/users/registration')
                .send({
                    email: 'Anu@successive.tech',
                    password: 'Training@123',
                });
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeUndefined();
        });
        test('In create user', async () => {
            const res = await req.post('/api/users/login')
                .send({
                    email: 'Anu@successive.tech',
                    password: 'Training@123',
                });
            expect(res.status).toBe(200);
            expect(res.body.data.data.token).not.toBeUndefined();
        });
    });
    describe('Negative Test Cases', () => {
        test('Negative Login Case', async () => {
            const res = await req.post('/api/users/login')
                .send({});
            expect(res.body.status).toBe(400);
        });
        test('Negative Register Case', async () => {
            const res = await req.post('/api/users/registration')
                .send({});
            expect(res.body.status).toBe(400);

        });
    });
});
