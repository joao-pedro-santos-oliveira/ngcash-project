"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'w2m302302',
        database: 'bank-users'
    }
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/login', (req, res) => {
    //const {username} = req.body.username
    //const {password} = req.body.password
    db.select('username', 'hash').from('login')
        .where('username', '=', req.body.username)
        .then(data => {
        const isValid = bcrypt_nodejs_1.default.compareSync(req.body.password, data[0].hash);
        console.log(isValid);
        if (isValid) {
            return db.select('*').from('users')
                .where('username', '=', req.body.username)
                .then(user => {
                res.json(user[0]);
            })
                .catch(err => res.status(400).json('Não foi possivel encontrar o usuário'));
        }
        else {
            res.status(400).json('credenciais erradas');
        }
    })
        .catch(err => res.status(400).json(err));
});
app.post('/registro', (req, res) => {
    const { name, username, password } = req.body;
    //const {username} = req.body.username
    //const {password} = req.body.password
    var hash = bcrypt_nodejs_1.default.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            username: username
        })
            .into('login')
            .returning('username')
            .then(loginUsername => {
            return trx('users')
                .returning('*')
                .insert({
                name: name,
                username: loginUsername[0].username
            }).then(user => {
                res.json(user[0]);
            });
        })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json('Não foi possivel realizar o cadastro'));
});
app.put('/transaction', (req, res) => {
    const { name, transfer } = req.body;
    db('users').where('username', '=', name)
        .increment('balance', -transfer)
        .returning('balance')
        .then(transfer => {
        res.json(transfer);
    });
});
app.listen(8000, () => {
    console.log('rodando servidor');
});
