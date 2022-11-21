const handleLogin = (db:any, bcrypt:any) => (req:any, res:any) => {
    db.select('username', 'hash').from('login')
    .where('username', '=', req.body.username)
    .then((data:any) => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        console.log(isValid)
        if(isValid){
            return db.select('*').from('users')
            .where('username', '=', req.body.username)
            .then((user:any) => {
                res.json(user[0])
            })
            .catch((err:any) => res.status(400).json('Não foi possivel encontrar o usuário'))
            
        }else{res.status(400).json('credenciais erradas')}
        
    })
    .catch((err:any) => res.status(400).json(err))
}

export default handleLogin