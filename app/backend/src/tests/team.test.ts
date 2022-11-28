import { dumpTeams, dumpTeam } from './mocks/teamMock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as funcionalidades na rota /teams', () => {
  beforeEach(async () => {
    sinon.stub(Team, "findAll").resolves( dumpTeams as Team[]);
  });

  afterEach(()=>{
   (Team.findAll as sinon.SinonStub).restore();
  })

  it('se retorna todos os teams', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(dumpTeams);
  });
});

describe('Testa as funcionalidades na rota /teams/:id', () => {
  describe('Testa o caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Team, "findByPk").resolves( dumpTeam as Team);
  
    });
  
    afterEach(()=>{
     (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('se retorna apenas o team cujo id foi passado por params', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(dumpTeam);
    });
  });

  describe('Testa o caso de erro', () => {
    beforeEach(async () => {
      sinon.stub(Team, "findByPk").resolves(null);
  
    });
  
    afterEach(()=>{
     (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('se retorna um erro quando o time não é encontrado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5');
  
        expect(chaiHttpResponse.status).to.equal(404);
        expect(chaiHttpResponse.body).to.equal('Not Found');
    });
  });
});