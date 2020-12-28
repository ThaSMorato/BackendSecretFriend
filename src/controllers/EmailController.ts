import EmailService from '../services/emailService/emailService';
import SortService from '../services/sortService/sortService';
import { Request, Response } from 'express';

export default{
    async sortAndSendHandler(request: Request, response: Response){ //error handler
       
        console.log(request.body);
        
       
         const  {
            participants
        } = request.body;
        let sorted = await SortService.SortUsers(participants);
        let cont = 0
        sorted.forEach(
            async user => {
                console.log(user);
                
                EmailService.sendMail('Secret Friend - No Reply','ScretFriend@noreply.com', user.email, "Secret Friend Project", `Your secret friend is ${user.sortedName} and it's email is ${user.sortedEmail}`).
                then(
                    success => {
                        cont = cont + 1;
                        console.log(success);
                        if(cont == sorted.length) {
                            console.log('cabo');
                            return response.json({data:`${cont} enviados com sucesso`})
                        }
                    }
                ).catch(
                    errr => {
                        cont = cont + 1;
                        console.log(errr)
                        if(cont == sorted.length) {
                            console.log('cabo');
                            return response.json({data:`${cont - 1} enviados com sucesso`})
                        }
                    }
                )
            }
        )
        return response.json({data:` enviados com sucesso`})
    }
}