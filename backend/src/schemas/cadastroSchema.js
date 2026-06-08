const { z } = require("zod");

const cadastroSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha mínimo 6 caracteres")
})

module.exports = { cadastroSchema }