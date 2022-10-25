import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {

  describe('Teste caso campo "email" esteja vazio',()=> {
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

  describe('Teste caso campo "email" ou campo "password" estejam invalidos', ()=> {
    const response = { message: 'Incorrect email or password'} 
    it('Deve retornar um status 401 e uma mensagem "Incorrect email or password"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'test@error.com', password: 'secret_admin'})
      expect(HTTPResponse.status).to.be.equal(401);
      expect(HTTPResponse.body).to.deep.equal(response);
    });

    it('Deve retornar um status 401 e uma mensagem "Incorrect email or password"', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'error_password'})
      expect(HTTPResponse.status).to.be.equal(401);
      expect(HTTPResponse.body).to.deep.equal(response);
    });
  })

  describe('Teste caso campo "email" e campo "password" estejam corretos',()=> {
    it('Deve retornar um status 200', async () => {
      const HTTPResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin'})
      expect(HTTPResponse.status).to.be.equal(200);
    });
  })
});