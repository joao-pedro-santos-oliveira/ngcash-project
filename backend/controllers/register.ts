import { deflate } from "zlib";

const handleRegister = (req:any, res:any, db:any, bcrypt:any) => {
    const {name, username, password} = req.body
    var hash = bcrypt.hashSync(password);
    db.transaction((trx:any) => {
        trx.insert({
            hash: hash,
            username: username

        })
        .into('login')
        .returning('username')
        .then((loginUsername:any) => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                  username: loginUsername[0].username
                }).then((user:any) => {
                    res.json(user[0])
                })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })    
    .catch((err:any) => res.status(400).json('Não foi possivel realizar o cadastro'))
}

export default handleRegister;