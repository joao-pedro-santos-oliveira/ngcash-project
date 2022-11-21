"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleRegister = (req, res, db, bcrypt) => {
    const { name, username, password } = req.body;
    var hash = bcrypt.hashSync(password);
    db.transaction((trx) => {
        trx.insert({
            hash: hash,
            username: username
        })
            .into('login')
            .returning('username')
            .then((loginUsername) => {
            return trx('users')
                .returning('*')
                .insert({
                name: name,
                username: loginUsername[0].username
            }).then((user) => {
                res.json(user[0]);
            });
        })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch((err) => res.status(400).json('Não foi possivel realizar o cadastro'));
};
exports.default = handleRegister;
