"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const rest_1 = require("@loopback/rest");
const ping_controller_1 = require("../src/controllers/ping.controller");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
describe('PingController', () => {
    let app;
    let client;
    beforeAll(async () => {
        app = new rest_1.RestApplication({
            rest: (0, testlab_1.givenHttpServerConfig)(),
        });
        app.controller(ping_controller_1.PingController);
        await app.start();
        client = (0, testlab_1.createRestAppClient)(app);
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
        await (0, supertest_1.default)(app.restServer.url).get('/ping').expect(200);
    });
});
//# sourceMappingURL=ping.controller.test.js.map