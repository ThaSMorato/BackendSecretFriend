import EmailService from '../services/emailService/emailService';
import SortService from '../services/sortService/sortService';
import { Request, Response } from 'express';

export default{
    async sortAndSendHandler(request: Request, response: Response){ //error handler
       
        console.log(request.body);
        
       
         const  {
            participants
        } = request.body;

        if(participants && participants.length > 3){
            let sorted = await SortService.SortUsers(participants);
            let cont = 0
            let ret :Array<{email:string, response:string, error?:any}> = [];
            sorted.forEach(
                async user => {
                    EmailService.sendMail('Secret Friend - No Reply','ScretFriend@noreply.com', user.email, "Secret Friend Project", `Your secret friend is ${user.sortedName} and it's email is ${user.sortedEmail}`).
                    then(
                        success => {
                            cont = cont + 1;
                            ret.push({email: user.email, response: "Successfully sent"});

                            if(cont == sorted.length) {
                                return response.json({data:ret})
                            }
                        }
                    ).catch(
                        errr => {
                            cont = cont + 1;
                            ret.push({email: user.email, response: "An error ocurred", error: errr});
                            if(cont == sorted.length) {
                                return response.json({data:ret})
                            }
                        }
                    )
                }
            )
        }else{
            return response.status(411).json({data: "Participants length < 3 or participants absent"});
        }
    }
}