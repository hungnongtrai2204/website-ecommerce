import nodemailer from "nodemailer";
import { google } from "googleapis";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_MAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//SEND EMAIL

export const sendEmail = async (to, url, txt, subject, template) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = (await oauth2Client.getAccessToken()).token;
  console.log(accessToken);

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_MAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    },
  });
  const mailOptions = {
    from: SENDER_MAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(to, url),
    auth: {
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  };
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};
