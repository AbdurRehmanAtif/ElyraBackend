import mailConfig from '../../config/mailable.js';

const mailService = {
    // Constructor not needed here

    // Method to send an email
    sendMail(mailOptions: []) {
        // return new Promise((resolve, reject) => {
        //     mailConfig.getTransporter().sendMail(mailOptions, (error, info) => {
        //         if (error) {
        //             reject(error);
        //         } else {
        //             resolve(info);
        //         }
        //     });
        // });

        console.log(mailConfig.getCompanyLogo())
        console.log(mailConfig.getCompanyName())
        console.log(mailConfig.getFromAddress())
    }
}

export default {
    mailService
}
