const db = require('../config/bd');

async function criarUsuario(nome, email, senha) {
    const sql = `INSERT INTO bibliotecario (nome, email, senha_hash) VALUES (?, ?, ?)`;

    const [resultado] = await db.execute(
        sql,
        [nome, email, senha]
    );

    return resultado;
}

async function buscarPorEmail(email) {
    const [rows] = await db.execute('SELECT * FROM bibliotecario WHERE email = ?', [email]);

    return rows[0];
}

module.exports = { criarUsuario, buscarPorEmail };