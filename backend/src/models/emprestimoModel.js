const db = require('../config/bd');

async function addEmprestimo(data_prevista, id_leitor, id_livro) {
    const sql = 'INSERT INTO emprestimos (data_emprestimo, data_prevista, data_devolucao, id_leitor, id_livro) VALUES (CURDATE(), ?, NULL, ?, ?)';
    
    const [resultado] = await db.execute(sql, [data_prevista, id_leitor, id_livro]);
    return resultado;
}

async function livroEstaEmprestado(id_livro) {
    const sql = 'SELECT * FROM emprestimos WHERE id_livro = ? AND data_devolucao IS NULL';

    const [rows] = await db.execute(sql, [id_livro]);
    return rows.length > 0;
}

module.exports = { addEmprestimo, livroEstaEmprestado }