import fs from 'fs'
import handleBars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class SendEmailService{
    private client:Transporter
    constructor(){
        nodemailer.createTestAccount().then(account=>{
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass, // generated ethereal password
                },
              });
            this.client=transporter
        })
    }
    async execute(to:string,subject:string,variables:object,path:string){
        const templateFile=fs.readFileSync(path).toString('utf8')

        const htmlMailTemplateParse=handleBars.compile(templateFile)
        
        const html=htmlMailTemplateParse(variables)

        const msg=await this.client.sendMail({
            from: 'NPS <noreplye@nps.com.br>',
            to,
            subject,
            html
        })
        console.log('Message sent: %s', msg.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(msg));
    }

}
export default new SendEmailService()