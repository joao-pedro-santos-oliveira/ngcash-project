"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleLogin = (db, bcrypt) => (req, res) => {
    db.select('username', 'hash').from('login')
        .where('username', '=', req.body.username)
        .then((data) => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(isValid);
        if (isValid) {
            return db.select('*').from('users')
                .where('username', '=', req.body.username)
                .then((user) => {
                res.json(user[0]);
            })
                .catch((err) => res.status(400).json('Não foi possivel encontrar o usuário'));
        }
        else {
            res.status(400).json('credenciais erradas');
        }
    })
        .catch((err) => res.status(400).json(err));
};
exports.default = handleLogin;
