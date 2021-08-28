// load the things we need
const express = require("express");
var cors = require("cors");
const app = express();
const _env = require("dotenv").config();
const fire = require("./route/db");
var db = fire.database();
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", async function (req, res, next) {
  res.render("index");
});

app.get("/dashboard-data", async function (req, res, next) {
  try {
    var arrData = [];

    const db_ref = await db.ref("/sensors/");
    db_ref.once(
      "value",
      function (snapshot) {
        snapshot.forEach((element) => {
          var snapshotVal = element.val();
          arrData.push(snapshotVal);
        });
        res.status(200).json({ result: arrData });
      },
      function (errorObj) {
        console.log(errorObj);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/sensor-datas", async function (req, res, next) {
  try {
    res.render("sensor-datas");
  } catch (error) {
    console.log(error);
  }
});
app.get("/data/berita", async function (req, res, next) {
  res.status(200).json({
    status: "ok",
    articles: [
      {
        id: "0",
        name: "Engadget",
        author: "David Murphy",
        title: "What You Need to Know About Buying Cryptocurrency on PayPal",
        description:
          "Whether you’re looking to make a larger investment or you just want to dabble in cryptocurrencies, you can purchase Bitcoin, Ethereum, Bitcoin Cash, and Litecoin through PayPal. And, soon, you’ll be able to pay various merchants using your cryptocurrency stas…",
        url:
          "https://lifehacker.com/what-you-need-to-know-about-buying-cryptocurrency-on-pa-1846585705",
        urlToImage:
          "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qvc2foo4ufow1cbsuk9f.jpg",
        publishedAt: "2021-03-31T14:00:00Z",
        content:
          "Whether youre looking to make a larger investment or you just want to dabble in cryptocurrencies, you can purchase Bitcoin, Ethereum, Bitcoin Cash, and Litecoin through PayPal. And, soon, youll be ab… [+3818 chars]",
      },
      {
        id: "1",
        name: "Engadget",
        author: "https://www.engadget.com/about/editors/steve-dent",
        title: "Tesla now accepts Bitcoin in the US",
        description:
          "As it promised earlier this year, Tesla now accepts payment in Bitcoin, according to Tesla's website and a tweet from CEO Elon Musk.",
        url:
          "https://www.engadget.com/tesla-will-soon-let-you-buy-one-of-its-e-vs-with-bitcoin-082916783.html",
        urlToImage:
          "https://s.yimg.com/os/creatr-uploaded-images/2021-03/d3bc78e0-8116-11eb-87fb-7bddf8711d48",
        publishedAt: "2021-03-24T08:29:16Z",
        content:
          "As it promised earlier this year, Tesla now accepts payment in Bitcoin, according to Tesla's website and a tweet from CEO Elon Musk. In a subsequent tweet, Musk said that \"Bitcoin paid to Tesla will … [+1390 chars]",
      },
      {
        id: "2",
        name: "Mashable",
        author: "Stan Schroeder",
        title: "You can now buy a Tesla with Bitcoin, Elon Musk says",
        description:
          "The inevitable has happened: You can now purchase a Tesla vehicle with Bitcoin. \nThis is according to Tesla CEO, pardon, Technoking Elon Musk, who tweeted it on Wednesday. \n\nYou can now buy a Tesla with Bitcoin\r\n\n— Elon Musk (@elonmusk) March 24, 2021\r\n\n\r\n\nTe…",
        url: "https://mashable.com/article/elon-musk-tesla-bitcoin/",
        urlToImage:
          "https://mondrian.mashable.com/2021%252F03%252F24%252F4c%252F5e557a4d5d144e0898e8f087466d455a.46b57.jpg%252F1200x630.jpg?signature=O7ZjxA7YXNEMQMd0_p1tOsVA6iY=",
        publishedAt: "2021-03-24T08:10:09Z",
        content:
          "The inevitable has happened: You can now purchase a Tesla vehicle with Bitcoin. \r\nThis is according to Tesla CEO, pardon, Technoking Elon Musk, who tweeted it on Wednesday. \r\nYou can now buy a Tesla … [+1648 chars]",
      },
      {
        id: "3",
        name: "techcrunch",
        author: "Darrell Etherington",
        title:
          "Elon Musk declares you can now buy a Tesla with Bitcoin in the U.S.",
        description:
          "Tesla made headlines earlier this year when it took out significant holdings in bitcoin, acquiring a roughly $1.5 billion stake at then-prices in early February. At the time, it also noted in an SEC filing disclosing the transaction that it could also eventua…",
        url:
          "http://techcrunch.com/2021/03/24/elon-musk-declares-you-can-now-buy-a-tesla-with-bitcoin-in-the-u-s/",
        urlToImage:
          "https://techcrunch.com/wp-content/uploads/2021/02/tesla-bitcoin-alt.jpg?w=711",
        publishedAt: "2021-03-24T11:55:49Z",
        content:
          "Tesla made headlines earlier this year when it took out significant holdings in bitcoin, acquiring a roughly $1.5 billion stake at then-prices in early February. At the time, it also noted in an SEC … [+2071 chars]",
      },
    ],
  });
});
app.get("/data-tables", async function (req, res, next) {
  try {
    var arrData = [];

    const db_ref = await db.ref("/sensors/");
    db_ref.once(
      "value",
      function (snapshot) {
        snapshot.forEach((element) => {
          var snapshotVal = element.val();
          arrData.push(snapshotVal);
        });

        res.status(200).json({ result: arrData });
      },
      function (errorObj) {
        console.log(errorObj);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
