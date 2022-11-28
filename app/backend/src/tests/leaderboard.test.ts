import * as sinon from 'sinon';
import * as chai from 'chai';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { dumpAllRatings, dumpAwayRatings, dumpHomeRatings, dumpTeamsAway, dumpTeamsHome } from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o método get da rota "/leaderboard"', () => {
  describe('Testa em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Team, "findAll")
      .onCall(0).resolves(dumpTeamsHome as unknown as Team[])
      .onCall(1).resolves(dumpTeamsAway as unknown as Team[]);
    });
  
    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Se retorna o objeto e status esperado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(dumpAllRatings);
    });
  });
});

describe('Testa o método get da rota "/leaderboard/home"', () => {
  describe('Testa em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Team, "findAll").resolves(dumpTeamsHome as unknown as Team[]);
    });
  
    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Se retorna o objeto e status esperado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(dumpHomeRatings);
    });
  });
});

describe('Testa o método get da rota "/leaderboard/away"', () => {
  describe('Testa em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Team, "findAll").resolves(dumpTeamsAway as unknown as Team[]);
    });
  
    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Se retorna o objeto e status esperado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(dumpAwayRatings);
    });
  });
});