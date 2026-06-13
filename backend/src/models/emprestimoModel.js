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


async function buscarEmprestimos(id_leitor) {
    const sql = 'SELECT e.id_emprestimo, l.titulo FROM emprestimos e INNER JOIN livros l ON l.id_livro = e.id_livro WHERE e.id_leitor = ? AND e.data_devolucao IS NULL';

    const [rows] = await db.execute(sql, [id_leitor]);
    return rows;
}

async function devolverLivro(id_emprestimo) {
    const sql = 'UPDATE emprestimos SET data_devolucao = CURDATE() WHERE id_emprestimo = ?'
    await db.execute(sql, [id_emprestimo]);
}

module.exports = { addEmprestimo, livroEstaEmprestado, buscarEmprestimos, devolverLivro }