import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {RestApplication, RestBindings} from '@loopback/rest';
import {PingController} from '../controllers/ping.controller';
import supertest from 'supertest';

describe('PingController', () => {
  let app: RestApplication;
  let client: Client;

  beforeAll(async () => {
    app = new RestApplication({
      rest: givenHttpServerConfig(),
    });

    app.controller(PingController);
    await app.start();

    client = createRestAppClient(app);
  });

  afterAll(async () => {
    await app.stop();
  });

  it('Debe responder con los campos esperados al llamar a GET /ping', async () => {
    const res = await client.get('/ping').expect(200);

    expect(res.body).toHaveProperty('greeting', 'Hello from LoopBack');
    expect(res.body).toHaveProperty('date');
    expect(res.body).toHaveProperty('url', '/ping');
    expect(res.body).toHaveProperty('headers');
    expect(res.body.headers).toHaveProperty('accept');
  });

  it('Debe responder con un status 200 usando Supertest', async () => {
    await supertest(app.restServer.url).get('/ping').expect(200);
  });
});
