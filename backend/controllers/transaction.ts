const handleTransaction = (req:any, res:any, db:any) => {
    const {name,transfer} = req.body
    db('users').where('username', '=', name)
    .increment('balance', -transfer)
    .returning('balance')
    .then((transfer:any) => {
        res.json(transfer)
    })

}

export default handleTransaction;