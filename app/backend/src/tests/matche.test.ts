import * as sinon from 'sinon';
import * as chai from 'chai';
import Matche from '../database/models/Matche';
import { dumpAllMatches, dumpMatche, dumpMatcheGoals, dumpMatcheWithTeamsEquals } from './mocks/matchesMock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { dumpToken } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o método get da rota "/matches"', () => {
  beforeEach(async () => {
    sinon.stub(Matche, "findAll").resolves( dumpAllMatches as unknown as Matche[]);
  });

  afterEach(()=>{
    (Matche.findAll as sinon.SinonStub).restore();
  })

  it('Se retorna o objeto e status esperado', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(dumpAllMatches);
  });
});

describe('Testa o método post da rota "/matches"', () => {
  describe('Testa a requisição em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Matche, "create").resolves( dumpMatche as unknown as Matche);
    });
  
    afterEach(()=>{
      (Matche.create as sinon.SinonStub).restore();
    })
  
    it('Se retorna o objeto e status esperado ao cadastrar com sucesso', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ Authorization: dumpToken})
        .send(dumpMatche);
  
        expect(chaiHttpResponse.status).to.equal(201);
        expect(chaiHttpResponse.body).to.deep.equal(dumpMatche);
    });
  });

  describe('Testa a requisição em caso de falha no token passado e times iguais', () => {
    beforeEach(async () => {
      sinon.stub(Matche, "create").resolves( dumpMatche as unknown as Matche);
    });
  
    afterEach(()=>{
      (Matche.create as sinon.SinonStub).restore();
    })
  
    it('Se retorna um erro ao verificar que não foi passado o token', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ Authorization: ''})
        .send(dumpMatche);
  
        expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se retorna um erro ao verificar que o token não é válido', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ Authorization: 'asjbdjhbajhsbja.akjdnchjiasnhcdcp'})
        .send(dumpMatche);
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se retorna um erro ao verificar que os times da casa e fora são iguais', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ Authorization: dumpToken})
        .send(dumpMatcheWithTeamsEquals);
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });

  describe('Testa a requisição em caso de erro no db', () => {
    beforeEach(async () => {
      sinon.stub(Matche, "create").resolves(undefined);
    });
  
    afterEach(()=>{
      (Matche.create as sinon.SinonStub).restore();
    })
  });
});

describe('Testa o método patch da rota "/matches/:id/finish"', () => {
  describe('Testa a requisição em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Matche, "update").resolves();
    });
  
    afterEach(()=>{
      (Matche.update as sinon.SinonStub).restore();
    });

    it('Se atualiza o progresso', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set({ Authorization: dumpToken});
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
    });

    it('Se retorna erro caso não seja passado o token', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set({ Authorization: ''});
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se retorna erro caso o token seja inválido', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set({ Authorization: 'akjsbdjakfb.asjndiakjn'});
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});

describe('Testa o método patch da rota "/matches/:id"', () => {
  describe('Testa a requisição em caso de sucesso', () => {
    beforeEach(async () => {
      sinon.stub(Matche, "update").resolves();
    });
  
    afterEach(()=>{
      (Matche.update as sinon.SinonStub).restore();
    });

    it('Se atualiza os gols da partida', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set({ Authorization: dumpToken})
        .send(dumpMatcheGoals);
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Updated' });
    });

    it('Se retorna erro caso não seja passado o token', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set({ Authorization: ''})
        .send(dumpMatcheGoals);
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Se retorna erro caso o token seja inválido', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set({ Authorization: 'akjsbdjakfb.asjndiakjn'})
        .send(dumpMatcheGoals);
  
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});