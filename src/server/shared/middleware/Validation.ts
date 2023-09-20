import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SchemaOf ,AnySchema,ValidationError} from 'yup';



type TProperty = 'body'|'header'|'params'|'query';

type TGetSchema =<T>(schema :SchemaOf<T>)=> SchemaOf<T>

type TAllShemas = Record<TProperty,AnySchema>

type TGetAllSchemas =(getSchema: TGetSchema)=> Partial<TAllShemas>

type Tvalidation =( cls:TGetAllSchemas)=> RequestHandler



export const validation:Tvalidation =(getAllSchemas)=> async (req,res,next) =>{

  const schemas =getAllSchemas((schema) => schema);

  const errorsResult:Record<string, Record<string,string>> = {};

  Object.entries(schemas).forEach(([key,schema])=>{

    try{
      
      schema.validateSync(req[key as TProperty],{abortEarly:false});
      
    }catch(err){
      const yupError = err as ValidationError;
      const errors:Record<string,string> = {};
      
      yupError.inner.forEach(error =>{
        
        if(!error.path)return;
        
        errors[error.path] = error.message;
      });
      
      errorsResult[key] = errors;
    
    }
  });
  
  return (Object.entries(errorsResult).length ===0)
    ?next()
    :res.status(StatusCodes.BAD_REQUEST).json({errors:errorsResult});
};

