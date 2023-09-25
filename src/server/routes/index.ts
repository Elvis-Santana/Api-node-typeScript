import { Router } from 'express';
import { Request,Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {CidadesController} from '../controller';
const router =  Router();

router.get('/',(req:Request,res:Response)=>{
  return res.json({test:'hello'});
});


router.get(
  '/cidades',
  CidadesController.getAllValidation, 
  CidadesController.getAll
);

router.get(
  '/cidades/:id',
  CidadesController.getByIdValidation, 
  CidadesController.getById
);

router.post(
  '/cidades',
  CidadesController.createValidation, 
  CidadesController.create
);


router.put(
  '/cidades/:id',
  CidadesController.updateByIdValidation, 
  CidadesController.updateById
);

router.delete(
  '/cidades/:id',
  CidadesController.deleteByIdValidation, 
  CidadesController.deleteById
);

export {router};

