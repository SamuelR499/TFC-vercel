import * as sinon from 'sinon';
import * as chai from 'chai';

import teamsList from './mocks/teamsMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Teste caso requisição get na rota /teams seja feita com sucesso',()=> {
    it('Deve retornar um status 200 e uma lista de times', async () => {
      const HTTPResponse = await chai.request(app).get('/teams')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(teamsList)
    });
  })

  describe('Teste caso requisição get na rota /teams/:id seja feita com sucesso', ()=> {
    it('Deve retornar um status 200 e um time', async () => {
      const HTTPResponse = await chai.request(app).get('/teams/1')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(teamsList[0]);
    });
  })
});