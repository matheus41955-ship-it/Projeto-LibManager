const db = require('../config/bd');

async function listarLivros() {
    const [rows] = await db.execute(`
        SELECT
            l.id_livro,
            l.titulo,
            l.autor,
            l.ano_publicacao,
            c.nome AS categoria,
            
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM emprestimos e 
                    WHERE e.id_livro = l.id_livro 
                    AND e.data_devolucao IS NULL
                )
                THEN 'Indisponível'
                ELSE 'Disponível'
            END AS disponibilidade

        FROM livros l
        LEFT JOIN categorias c 
            ON l.id_categoria = c.id_categoria
    `);

    return rows;
}

async function cadastrarLivro(titulo, autor, editora, ano_publicacao, id_categoria) {
    const sql = 'INSERT INTO livros (titulo, autor, editora, ano_publicacao, id_categoria) VALUES (?, ?, ?, ?, ?)'
    const [resultado] = await db.execute(sql, [titulo, autor, editora, ano_publicacao, id_categoria]);
    
    return resultado;
}

async function listarCategorias() {
    const [rows] = await db.execute("SELECT id_categoria, nome FROM categorias ORDER BY id_categoria ASC");

    return rows;
}

module.exports = { listarLivros, cadastrarLivro, listarCategorias }