const db = require('../config/bd');

async function listarLeitores() {
    const [rows] = await db.execute(`
        SELECT
            l.id_leitor,
            l.nome,
            l.email,
            l.telefone,
            lv.titulo
        FROM leitores l
        LEFT JOIN emprestimos e
            ON e.id_leitor = l.id_leitor
            AND e.data_devolucao IS NULL
        LEFT JOIN livros lv
            ON lv.id_livro = e.id_livro
    `); // Resultado com nomes repetidos para cada livro emprestado, por ser left join

    const mapa = {}; // Cria um mapeamento de cada leitor

    rows.forEach((row) => {
        if(!mapa[row.id_leitor]) {
            mapa[row.id_leitor] = {
                id_leitor: row.id_leitor,
                nome: row.nome,
                email: row.email,
                telefone: row.telefone,
                livros: []
            };
        }

        if (row.titulo) {
            mapa[row.id_leitor].livros.push(row.titulo);
        }
    }); // Percorre cada linha do SQL e coloca cada leitor no mapa e coloca todos os livros desse leitor em um array, evitando q saia nomes repetidos

    return Object.values(mapa);
}

async function opcaoLeitores() {
    const [rows] = await db.execute("SELECT id_leitor, nome FROM leitores ORDER BY id_leitor ASC");

    return rows;
}

async function cadastrarLeitor(nome, email, telefone) {
    const sql = 'INSERT INTO leitores (nome, email, telefone) VALUES (?, ?, ?)'
    const [resultado] = await db.execute(sql, [nome, email, telefone]);

    return resultado;
}

async function excluirLeitor(id) {
    const sql = 'DELETE FROM leitores WHERE id_leitor = ?'
    const [resultado] = await db.execute(sql, [id]);

    return resultado;
}

async function possuiEmprestimos(id) {
    const sql = `
        SELECT COUNT(*) AS total
        FROM emprestimos
        WHERE id_leitor = ?
        AND data_devolucao IS NULL
    `;
    const [rows] = await db.execute(sql, [id]);

    return rows[0].total > 0;
}

module.exports = { listarLeitores, opcaoLeitores, cadastrarLeitor, excluirLeitor, possuiEmprestimos }