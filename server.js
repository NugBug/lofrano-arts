const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const enforce = require("express-sslify");
const nodemailer = require("nodemailer");

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

// app.get("/service-worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
// });

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

app.post("/contact", (req, res) => {
  var data = req.body;

  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    },
  });

  let mailOptions = {
    from: data.email,
    to: "lofranoart@gmail.com",
    subject: "Lofrano Arts - Contact Form Submission",
    html: `<p>Topic: ${data.topic}</p>
            <p>Name of User: ${data.name}</p>
          <p>User Email: ${data.email}</p>
          <p>Message: ${data.message}</p>`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
      console.log(error);
    } else {
      res.send("Success");
      console.log(response);
    }
    smtpTransport.close();
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
