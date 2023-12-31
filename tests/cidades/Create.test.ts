import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades -create', () => {
  it('Cria registro',async ()=>{
    const res1 =await testServer
      .post('/cidades')
      .send({nome:'Caxias do sul'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('TESTA criar registro com nome muito curto',async ()=>{
    const res1 =await testServer
      .post('/cidades')
      .send({nome:'Ca'});


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });
});








