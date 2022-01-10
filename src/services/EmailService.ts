import path from "path";
import ejs from "ejs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  tls: { ciphers: "SSLv3" },
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

class EmailService {
  async sendEmail(data: any, callback: Function) {
    const ejsFile = path.resolve(__dirname, `./emails/${data.template}.ejs`);
    console.log(ejsFile);
    ejs.renderFile(ejsFile, data, function (err, htmlString) {
      if (err) console.error(err);

      let mailOption = {
        from: data.from || process.env.FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: htmlString,
      };

      transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    });
  }
}
export default EmailService;
