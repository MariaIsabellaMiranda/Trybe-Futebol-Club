import { dumpTeams, dumpTeam } from './teamMock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as funcionalidades na rota /teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Team, "findAll").resolves( dumpTeams as Team[]);
    sinon.stub(Team, "findByPk").resolves( dumpTeam as Team);

  });

  afterEach(()=>{
   (Team.findAll as sinon.SinonStub).restore();
   (Team.findByPk as sinon.SinonStub).restore();
  })

  it('se retorna todos os teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(dumpTeams);
  });

  it('se retorna apenas o team cujo id foi passado por params', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(dumpTeam);
  });
});