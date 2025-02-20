const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const packages = require('./data/packages');

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Para processar JSON nas requisições
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: 'Mayamaria', // Substitua pela sua senha do MySQL
    database: 'gestao_viagens' // Nome do banco de dados
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

// Middleware de autenticação
const requireAuth = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Rotas do Frontend
app.get('/', (req, res) => {
    const query = 'SELECT * FROM pacotes_viagem';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacotes:', err);
            return res.status(500).send('Erro ao carregar pacotes.');
        }
        res.render('index', {
            packages: results, // Passa os pacotes do banco de dados para a view
            authenticated: req.session.authenticated
        });
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
    const packageId = req.params.id;
    const query = 'SELECT * FROM pacotes_viagem WHERE id = ?';
    connection.query(query, [packageId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacote:', err);
            return res.status(500).send('Erro ao carregar pacote.');
        }
        if (results.length === 0) {
            return res.status(404).send('Pacote não encontrado');
        }
        res.render('package', { pkg: results[0] });
    });
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
    const query = 'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, telefone], (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            return res.redirect('/private/cadastro?error=Erro ao cadastrar');
        }
        res.redirect('/private/cadastro?success=true');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(); // Destrói a sessão
    res.redirect('/');
});

// Rotas da API (Backend)
// Criar um novo pacote
app.post('/api/pacotes', (req, res) => {
    const { destino, descricao, preco, duracao, data_partida } = req.body;
    const query = `
        INSERT INTO pacotes_viagem (destino, descricao, preco, duracao, data_partida)
        VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(query, [destino, descricao, preco, duracao, data_partida], (err, results) => {
        if (err) {
            console.error('Erro ao criar pacote:', err);
            return res.status(500).json({ error: 'Erro ao criar pacote.' });
        }
        res.status(201).json({ message: 'Pacote criado com sucesso!', id: results.insertId });
    });
});

// Listar todos os pacotes
app.get('/api/pacotes', (req, res) => {
    const query = 'SELECT * FROM pacotes_viagem';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacotes:', err);
            return res.status(500).json({ error: 'Erro ao buscar pacotes.' });
        }
        res.status(200).json(results);
    });
});

// Buscar um pacote por ID
app.get('/api/pacotes/:id', (req, res) => {
    const packageId = req.params.id;
    const query = 'SELECT * FROM pacotes_viagem WHERE id = ?';
    connection.query(query, [packageId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacote:', err);
            return res.status(500).json({ error: 'Erro ao buscar pacote.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pacote não encontrado.' });
        }
        res.status(200).json(results[0]);
    });
});

// Atualizar um pacote
app.put('/api/pacotes/:id', (req, res) => {
    const packageId = req.params.id;
    const { destino, descricao, preco, duracao, data_partida } = req.body;
    const query = `
        UPDATE pacotes_viagem
        SET destino = ?, descricao = ?, preco = ?, duracao = ?, data_partida = ?
        WHERE id = ?
    `;
    connection.query(query, [destino, descricao, preco, duracao, data_partida, packageId], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar pacote:', err);
            return res.status(500).json({ error: 'Erro ao atualizar pacote.' });
        }
        res.status(200).json({ message: 'Pacote atualizado com sucesso!' });
    });
});

// Excluir um pacote
app.delete('/api/pacotes/:id', (req, res) => {
    const packageId = req.params.id;
    const query = 'DELETE FROM pacotes_viagem WHERE id = ?';
    connection.query(query, [packageId], (err, results) => {
        if (err) {
            console.error('Erro ao excluir pacote:', err);
            return res.status(500).json({ error: 'Erro ao excluir pacote.' });
        }
        res.status(200).json({ message: 'Pacote excluído com sucesso!' });
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});