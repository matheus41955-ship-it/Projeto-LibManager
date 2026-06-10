const { z } = require("zod");

const leitorSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mínimo 2 caracteres"),
    email: z.string().email("Email inválido."),
    telefone: z.string().transform((v) => v.replace(/\D/g, '')).refine((v) => /^(\d{10}|\d{11})$/.test(v), 'Telefone inválido.'),
});

module.exports = { leitorSchema }