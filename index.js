let express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("lauricio"));

app.use(
  session({
    secret: "lauricio",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.get("/", (req, res) => {
  let nomeErro = req.flash("nomeErro");
  let emailErro = req.flash("emailErro");
  let pontoErro = req.flash("pontoErro");
  let email = req.flash("email");
  emailErro =
    emailErro == undefined || emailErro.legth == 0 ? undefined : emailErro;

  res.render("index", {
    nomeErro,
    emailErro,
    pontoErro,
    email,
  });
});

app.post("/auth", (req, res) => {
  let { nome, email, ponto } = req.body;
  let nomeErro;
  let emailErro;
  let pontoErro;

  if (nome == undefined || nome == "") {
    nomeErro = " o nome não pode estar vazio!";
  }
  if (email == undefined || email == "") {
    emailErro = " o email não pode estar vazio!";
  }
  if (ponto == undefined || ponto < 30) {
    pontoErro = " os pontos não podem ser menores de 30";
  }

  if (
    nomeErro != undefined ||
    emailErro != undefined ||
    pontoErro != undefined
  ) {
    //setando valores na memoria flash
    req.flash("nomeErro", nomeErro);
    req.flash("emailErro", emailErro);
    req.flash("pontoErro", pontoErro);
    req.flash("email", email);
    res.redirect("/");
  } else {
    res.send("este form é show de bola");
  }
});

app.listen(3000, (erro) => {
  if (erro) {
    console.log("erro ao execultar!");
  } else {
    console.log("servidor online!");
  }
});
