import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt-nodejs'
import knex from 'knex'
import handleLogin from './controllers/login'


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'w2m302302',
      database : 'bank-users'
    }
  })


const app = express()

app.use(express.json())
app.use(cors());


app.post('/login', (req, res) => {
    //const {username} = req.body.username
    //const {password} = req.body.password
    db.select('username', 'hash').from('login')
    .where('username', '=', req.body.username)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        console.log(isValid)
        if(isValid){
            return db.select('*').from('users')
            .where('username', '=', req.body.username)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Não foi possivel encontrar o usuário'))
            
        }else{res.status(400).json('credenciais erradas')}
        
    })
    .catch(err => res.status(400).json(err))
})

app.post('/registro', (req, res) => {
    const {name, username, password} = req.body
    //const {username} = req.body.username
    //const {password} = req.body.password
    var hash = bcrypt.hashSync(password);
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
                    res.json(user[0])
                })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })    
    .catch(err => res.status(400).json('Não foi possivel realizar o cadastro'))
})

app.put('/transaction', (req, res) => {
    const {name,transfer } = req.body
    db('users').where('username', '=', name)
    .increment('balance', -transfer)
    .returning('balance')
    .then(transfer => {
        res.json(transfer)
    })

})


app.listen(8000, () => {
    console.log('rodando servidor')
})