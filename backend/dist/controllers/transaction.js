"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleTransaction = (req, res, db) => {
    const { name, transfer } = req.body;
    db('users').where('username', '=', name)
        .increment('balance', -transfer)
        .returning('balance')
        .then((transfer) => {
        res.json(transfer);
    });
};
exports.default = handleTransaction;
