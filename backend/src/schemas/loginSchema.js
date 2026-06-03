const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha precisa conter ao menos 6 caracteres")
});

module.exports = { loginSchema }