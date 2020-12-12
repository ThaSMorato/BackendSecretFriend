import { Router } from 'express';
import EmailController from './controllers/EmailController';

const routes = Router();

routes.post('/api/Email/SortAndSend',EmailController.sortAndSendHandler)
routes.get('/', (request, response) => {
    response.send("<h1>Teste</h1>")
} )

export default routes;