import * as sinon from 'sinon';
import * as chai from 'chai';

import matchesList from './mocks/matchesMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Matches from '../database/models/MatchesModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Teste caso requisição get na rota /matches seja feita com sucesso',()=> {
    it('Deve retornar um status 200 e listar os dados de partidas', async () => {
      sinon.stub(Matches, 'findAll').resolves(matchesList as unknown as Matches[])
      const HTTPResponse = await chai.request(app).get('/matches')
      expect(HTTPResponse.status).to.be.equal(200);
      expect(HTTPResponse.body).to.be.deep.equal(matchesList)
    });
  })

});