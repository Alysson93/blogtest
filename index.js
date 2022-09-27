const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/noticias', (req, res) => {
    res.render('noticias');
});

app.get('/add', (req, res) => {
    res.render('addNews');
})

app.post('/add', (req, res) => {
    res.send('to do');
});

app.get('/edit', (req, res) => {
    res.render('editNews');
});

app.post('/edit/:id', (req, res) => {
    res.send('to do');
});

app.post('/del/:id', (req, res) => {
    res.send('to do');
});

app.listen(8080, () => {
    console.log('Servidor rodando.');
});