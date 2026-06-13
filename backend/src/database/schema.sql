CREATE DATABASE libmanager;
USE libmanager;

CREATE TABLE bibliotecario (
	id_bibliotecario INT auto_increment PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE leitores (
	id_leitor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE categorias (
	id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE livros (
	id_livro INT auto_increment PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    editora VARCHAR(100) NOT NULL,
    ano_publicacao INT NOT NULL,
    
    id_categoria INT NOT NULL,
    
    FOREIGN KEY (id_categoria)
		REFERENCES categorias(id_categoria)
);

CREATE TABLE emprestimos (
	id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
	data_emprestimo DATE NOT NULL,
    data_prevista DATE NOT NULL,
    data_devolucao DATE NULL,
    
    id_leitor INT NOT NULL,
    id_livro INT NOT NULL,
    
    FOREIGN KEY (id_leitor)
		REFERENCES leitores(id_leitor)
		ON DELETE CASCADE,
        
	FOREIGN KEY (id_livro)
		REFERENCES livros(id_livro)
);
