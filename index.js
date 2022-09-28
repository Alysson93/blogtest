const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use(routes);

const sequelize = require('./config/connection');
sequelize.sync().then((result) => {
    app.listen(8080);
}).catch((err) => {
    console.log(err);
});