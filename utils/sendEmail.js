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

export const sendOrderEmail = async (
  to,
  url,
  txt,
  subject,
  template,
  order
) => {
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
  function formatDateRange(startDate, endDate) {
    // Assuming startDate and endDate are JavaScript Date objects
    const monthNames = [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ];

    // Format start and end dates
    let formattedStartDate = `${startDate.getDate()} ${
      monthNames[startDate.getMonth()]
    }`;
    let formattedEndDate = `${endDate.getDate()} ${
      monthNames[endDate.getMonth()]
    }`;

    // Combine them for the range
    return `${formattedStartDate}-${formattedEndDate}`;
  }
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  const date = new Date(order.createdAt); // February 17, 2023 (month is 0-indexed in JavaScript)
  const options = { day: "numeric", month: "long" };
  const orderDate = new Intl.DateTimeFormat("vi-VN", options).format(date);
  const shippingDate = new Intl.DateTimeFormat("vi-VN", options).format(
    new Date(order.updatedAt)
  );
  const deliveryDate = formatDateRange(
    addDays(new Date(order.updatedAt), 3),
    addDays(new Date(order.updatedAt), 7)
  );
  console.log(order.products);
  let today = new Date(); // Use your specific date here
  let formattedDate =
    today.getDate().toString().padStart(2, "0") +
    "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getFullYear();
  const mailOptions = {
    from: SENDER_MAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(
      orderDate,
      shippingDate,
      deliveryDate,
      order,
      order.products,
      order.totalBeforeDiscount,
      order.total,
      order.totalBeforeDiscount - order.total,
      0,
      formattedDate
    ),
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
