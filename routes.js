const route = require('express').Router();
const Op = require('sequelize').Op;

const Post = require('./models/Post');

route.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        if (posts.length == 0) {
            res.render('emptyBlog');
        } else {
            res.render('blog', {posts: posts});
        }
    });
});

route.get('/ler/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (post === null) {
        res.redirect('404');
    } else {
        res.render('noticias', { post: post });
    }
});

route.get('/lista', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('listar', {posts: posts});
    });
});

route.get('/add', (req, res) => {
    res.render('addNews');
})

route.post('/add', (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        imgUrl: '/img/' + req.file.filename
    }).then(() => {
        res.redirect('/lista');
    }).catch((err) => {
        res.send(err);
    })
});

route.get('/edit/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (post === null) {
        res.redirect('404');
    } else {
        res.render('editNews', {post: post});
    }
});

route.post('/edit/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        imgUrl: '/img/' + req.file.filename
    }, {
        where: {id: req.params.id}
    }).then(() => {
        res.redirect('/lista');
    }).catch((err) => {
        res.send(err);
    })
});

route.post('/del/:id', (req, res) => {
    Post.destroy({where: {id: req.params.id}}).then(() => {
        res.redirect('/lista');
    }).catch((err) => {
        res.send(err);
    });
});

route.get('/search', async (req, res) => {
    const query = req.query.search;
    const posts = await Post.findAll({
        where: {
            title: { [Op.like]: `%${query}%` }
        }
    });
    res.render('blog', {posts: posts});
});

route.get('/listaSearch', async (req, res) => {
    const query = req.query.search;
    const posts = await Post.findAll({
        where: {
            title: { [Op.like]: `%${query}%` }
        }
    });
    res.render('listar', {posts: posts});
});

route.get('*', (req, res) => {
    res.render('404');
});

module.exports = route;