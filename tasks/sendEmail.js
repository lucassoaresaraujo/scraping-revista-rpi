const nodemailer = require("nodemailer");
const EMAIL_CONFIG = require("../email.config.js");

module.exports = async data => {
  let transporter = nodemailer.createTransport({
    host: EMAIL_CONFIG.host,
    port: EMAIL_CONFIG.port,
    secure: EMAIL_CONFIG.secure, // true for 465, false for other ports
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.pass
    }
  });

  let info = await transporter.sendMail({
    from: '"Lucas Soares" <lucassoaresaraujo271@gmail.com>',
    to: "lucas.soares.araujo@hotmail.com, lorentzrafa@gmail.com", // lorentzrafa@gmail.com
    subject: `Revista ${data.numeroRevista}`,
    text: `Segue em anexo os contratos da Revista ${data.numeroRevista}`, // plain text body
    //html: "<b>O Trabalho de conclusão de curso foi entregue com sucesso</b>", // html body
    attachments: [
      {
        filename: `revista-${data.numeroRevista}.xlsx`,
        path: "./arquivo/excel.xlsx"
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
};
