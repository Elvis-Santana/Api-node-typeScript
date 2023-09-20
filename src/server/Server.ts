import express from 'express';
import './shared/services/TransiationsYup';

import {router} from './routes/';
import 'dotenv/config';


const server =express();

server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.use(router);

export {server};