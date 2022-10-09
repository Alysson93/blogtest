const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
        cb(null, 'post_' + file.originalname);
    }
});
app.use(multer({ storage: storage }).single('image'));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use(routes);

const sequelize = require('./config/connection');
sequelize.sync().then((result) => {
    app.listen(8080);
}).catch((err) => {
    console.log(err);
});