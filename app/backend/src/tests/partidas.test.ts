import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Matches from '../database/models/MatchesModel';
import { Response } from 'superagent';
import {
  matchesList,
  matchesInProgress,
  matchesFinesh,
  newMatch
} from './mocks/matchesMock'

chai.use(chaiHttp);

const { expect } = chai;

describe.only('GET /matches', () => {

  describe('Teste caso requisição get na rota /matches seja feita com sucesso',()=> {
    before(() => sinon.stub(Matches, 'findAll').resolves(matchesList as unknown as Matches[]))
    after(() => sinon.restore())
    it('Deve retornar um status 200 e listar os dados de partidas', async () => {
      const HTTPResponse = await chai.request(app).get('/matches')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(matchesList)
    });
  })

  describe('Teste caso requisição "query" <?inProgress=true> na rota get /matches seja feita com sucesso',()=> {
    before(() => sinon.stub(Matches, 'findAll').resolves(matchesInProgress as unknown as Matches[]))
    after(() => sinon.restore())
    it('Deve retornar um status 200 e listar os dados de partidas em progresso', async () => {
      const HTTPResponse = await chai.request(app).get('/matches?inProgress=false')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(matchesInProgress)
    });
  })

  describe('Teste caso requisição "query" <?inProgress=false> na rota get /matches seja feita com sucesso',()=> {
    before(() => sinon.stub(Matches, 'findAll').resolves(matchesFinesh as unknown as Matches[]))
    after(() => sinon.restore())
    it('Deve retornar um status 200 e listar os dados de partidas finalizadas', async () => {
      const HTTPResponse = await chai.request(app).get('/matches?inProgress=false')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(matchesFinesh)
    });
  })

  describe('Teste caso requisição do tipo post na rota /matches seja feita sem o token',()=> {
    before(() => sinon.stub(Matches, 'create').resolves(newMatch as unknown as Matches))
    before(() => sinon.stub)
    after(() => sinon.restore())
    it('Deve retornar um status 401 e uma mensagem "Token not found"', async () => {
      const body = {
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }
      const HTTPResponse = await chai.request(app).post('/matches').send(body)
      expect(HTTPResponse.status).to.be.equal(401);
      expect(HTTPResponse.body).to.be.deep.equal({ message: 'Token not found' })
    });
  })
});