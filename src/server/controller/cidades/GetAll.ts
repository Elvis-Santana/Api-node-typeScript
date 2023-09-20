import {  Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

const MORETHAN:number =0;


interface IQueryProps{
  page?:number;
  limt?:number;
  filter?:string
}




export const getAllValidation = validation((getSchema)=> ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limt:   yup.number().optional().moreThan(0),
    filter: yup.string().optional()

  })),


}));


export const getAll =async (req:Request<{},{},{},IQueryProps>,res: Response)=>{
  res.setHeader('access-control-headers','x-total-count');
  res.setHeader('x-total-count',1);


  return res.status(StatusCodes.OK).json([
    {
      id:1,
      nome:'Caxias do sul',
    }
  ]);


};