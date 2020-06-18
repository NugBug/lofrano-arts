const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.post("/admin", (req, res) => {
  if (
    req.body.currentUserId === process.env.ADMIN_ONE ||
    req.body.currentUserId === process.env.ADMIN_TWO
  ) {
    res.status(200).send({ permission: true });
  } else {
    res.status(401).send({ permission: false });
  }
});

// app.get("/api/send_email", function (req, res) {
//   res.set("Content-Type", "application/json");

//   const locals = { userName: req.body.userName };
//   const messageInfo = {
//     email: req.body.email,
//     fromEmail: "info@ingsw.com",
//     fromName: "Star Wars",
//     subject: "Checkout this awesome droids",
//   };
//   mailer.sendOne("droids", messageInfo, locals);

//   res.send('{"message":"Email sent."}');
// });

// const mailjet = require("node-mailjet").connect(
//   "6fdf15fe916f6c5a5176a862edc59a53",
//   "707f88e95105ac2c2f5907614b3815d5"
// );
// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//     {
//       From: {
//         Email: "joshtanguay@gmail.com",
//         Name: "Josh",
//       },
//       To: [
//         {
//           Email: "joshtanguay@gmail.com",
//           Name: "Josh",
//         },
//       ],
//       Subject: "Greetings from Mailjet.",
//       TextPart: "My first Mailjet email",
//       HTMLPart:
//         "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       CustomID: "AppGettingStartedTest",
//     },
//   ],
// });
// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err.statusCode);
//   });

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
