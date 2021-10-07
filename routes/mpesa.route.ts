import { Router } from 'https://deno.land/x/oak/mod.ts';

import b2cController from '../controllers/b2cController.ts';

import tokenController from '../controllers/tokenController.ts';

import sktController from '../controllers/sktController.ts';


const router = new Router();

router

	.post('/generate_token', tokenController.tokenController) // generate token router

	.post('/b2c_transaction', b2cController.b2cController) // b2c transaction router

	.post('/stk_push', sktController.stkController) // lipa na mpesa transaction transaction router

export default router;
