import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Users from '../database/models/UserModel';
import { Response } from 'superagent';
import { boolean } from 'joi';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {

  describe('Teste caso campo "email" esteja vazio', ()=> {

    const response = { message: 'All fields must be filled'} 
    it('Deve retornar um status 400 e uma mensagem "All fields must be filled"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ password: '123456'})
      expect(HTTPResponse.status).to.be.equal(400);
      expect(HTTPResponse.body).to.deep.equal(response);
    });
  })

  describe('Teste caso campo "password" esteja vazio',()=> {
    const response = { message: 'All fields must be filled'} 
    it('Deve retornar um status 400 e uma mensagem "All fields must be filled"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com'})
      expect(HTTPResponse.status).to.be.equal(400);
      expect(HTTPResponse.body).to.deep.equal(response);
    });
  })

  describe('Teste caso campo "email" esteja incorreto', ()=> {
    before(() => sinon.stub(Users, 'findOne').resolves(null))
    after(() => sinon.restore())
    const response = { message: 'Incorrect email or password'} 
    it('Deve retornar um status 401 e uma mensagem "Incorrect email or password"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'test@error.com', password: 'secret_admin'})
      expect(HTTPResponse.status).to.be.equal(401);
      expect(HTTPResponse.body).to.deep.equal(response);
    });
  })

  describe('Teste caso campo "password" esteja incorreto', ()=> {
    const user = { id: 1, username: 'any_user', email: 'email@mail.com', password: '123456' }
    const response = { message: 'Incorrect email or password'}

    before(() => sinon.stub(Users, 'findOne').resolves(user as Users))
    before(() => sinon.stub(bcrypt, 'compare').resolves(false))
    after(() => sinon.restore())

    it('Deve retornar um status 401 e uma mensagem "Incorrect email or password"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'error_password'})
      expect(HTTPResponse.status).to.be.equal(401);
      expect(HTTPResponse.body).to.deep.equal(response);
    });

  })


  describe('Teste caso campo "email" e campo "password" estejam corretos',()=> {
    const user = { id: 1, username: 'any_user', email: 'email@mail.com', password: '123456' }
    before(() => sinon.stub(Users, 'findOne').resolves(user as Users))
    before(() => sinon.stub(bcrypt, 'compare').resolves(true))
    after(() => sinon.restore())

    it('Deve retornar um status 200', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin'})
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.have.property('token');
    });
  })
});
