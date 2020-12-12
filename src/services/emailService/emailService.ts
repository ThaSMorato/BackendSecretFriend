import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export default {
    async sendMail(from: string, fromEmail: string, toEmail: string, subject: string, mensage: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'email',
                    pass: 'password'
                }
            });

            transporter.sendMail({
                from: `"${from}" <${fromEmail}>`,
                to: `${toEmail}`,
                subject,
                text: mensage,
                html: `<h1>${mensage}</h1>`
            }).then(
                success => {
                    resolve(success);
                }
            ).catch(
                err=> {
                    reject(err);
                }
            )
        })
    },
   
}