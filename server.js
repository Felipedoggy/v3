const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const packages = require('./data/packages');

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Middleware de autenticação
const requireAuth = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Rotas
app.get('/', (req, res) => {
    res.render('index', { 
        packages,
        authenticated: req.session.authenticated 
    });
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/login');
    }
    if (username === 'admin' && password === 'admin') {
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.render('login', { error: 'Usuário ou senha incorretos' });
    }
});

app.get('/package/:id', requireAuth, (req, res) => {
    const pkg = packages.find(p => p.id === parseInt(req.params.id));
    if (pkg) {
        res.render('package', { pkg });
    } else {
        res.status(404).send('Pacote não encontrado');
    }
});


app.get('/private/cadastro', requireAuth, (req, res) => {
    res.render('private/cadastro');
});

app.post('/cadastro', (req, res) => {
    const { nome, email, telefone } = req.body;

    // Validação simples
    if (!nome || !email || !telefone) {
        return res.redirect('/private/cadastro?error=Preencha todos os campos');
    }

    // Aqui você pode salvar os dados no banco de dados
    console.log('Cliente cadastrado:', { nome, email, telefone });

    // Redireciona com mensagem de sucesso
    res.redirect('/private/cadastro?success=true');
});

app.get('/logout', (req, res) => {
    req.session.destroy(); // Destrói a sessão
    res.redirect('/');
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));