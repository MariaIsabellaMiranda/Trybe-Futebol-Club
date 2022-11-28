import { dumpUser, dumpToken } from './mocks/userMock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o método post da rota "/login"', () => {
  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves( dumpUser as unknown as User);
  });

  afterEach(()=>{
   (User.findOne as sinon.SinonStub).restore();
  })

  it('se é possível fazer login com dados corretos', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })

      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.status).to.equal(200);
  });

  it('se não é possível fazer login sem informar um email', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: dumpUser.password})

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('se não é possível fazer login sem informar uma senha', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: dumpUser.email })

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('se não é possível fazer login com um email inválido', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'emailError', password: dumpUser.password})

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  });

  it('se não é possível fazer login com uma senha inválida', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: dumpUser.email, password: 'passwordError' })

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  });
});

describe('Testa o método get da rota "/login/validate"', () => {
  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves( dumpUser as unknown as User);
  });

  afterEach(()=>{
   (User.findOne as sinon.SinonStub).restore();
  })

  it('se é retornado os dados corretamente ao passar um token correto', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', dumpToken)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ role: dumpUser.role });
  });

  it('se é retornado erro caso token seja inválido', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', '')

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  });
});
