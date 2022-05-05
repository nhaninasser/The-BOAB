const sequelize = require("./config/config");
const express = require("express");
const routes = require("./controllers");
const helpers = require("./utils/helper")
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "SUPER SECRET SECRET",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

const app = express();



const PORT = process.env.PORT || 3001;


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
}); 