const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;

sgMail.setApiKey(API_KEY);

// Send welcome email after new user sign up
exports.welcomeEmail = functions.auth.user().onCreate((user) => {
  const msg = {
    to: user.email,
    from: "James@lofranoarts.com",
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      name: user.displayName,
      Sender_Name: "James Lofrano",
    },
  };

  return sgMail.send(msg);
});

// Sends email via HTTP. Can be called from frontend.
exports.genericEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth && !context.auth.token.email) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Must be logged with an email address"
    );
  }

  const msg = {
    to: context.auth.token.email,
    from: "hello@fireship.io",
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: data.subject,
      name: data.text,
    },
  };

  await sgMail.send(msg);

  // Handle errors here

  // Response must be JSON serializable
  return { success: true };
});
