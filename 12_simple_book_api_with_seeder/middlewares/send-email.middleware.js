const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookCreatedEmail = async (book) => {
  // Compile Pug template
  const html = pug.renderFile(
    path.join(__dirname, '../views/bookCreated.pug'),
    {
      title: book.title,
      author: book.author,
      year: book.year || 'N/A',
    }
  );

  const mailOptions = {
    from: `"Book API" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'A new book has been added!',
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookCreatedEmail;