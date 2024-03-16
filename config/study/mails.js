const nodemailer = require("nodemailer");
const mailable = require('../../config/mailable');

require('dotenv').config();

console.log(mailable.transporter())
// var transport = nodemailer.createTransport({
//     host: process.env.HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//         user: process.env.USERNAME,
//         pass: process.env.PASSWORD,
//     },
// });
// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "d552e8f7ce87ff",
//       pass: "********cc00"
//     }
//   });
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // send mail with defined transport object
//     const info = await transport.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     //
//     // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//     //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//     //       <https://github.com/forwardemail/preview-email>
//     //
// }

// main().catch(console.error);

// main()