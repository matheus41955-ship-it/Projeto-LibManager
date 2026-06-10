import { z } from 'zod';

const leitorSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mínimo 2 caracteres"),
    email: z.string().email("Email inválido!"),
    telefone: z.string().regex(/^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/, "Telefone Inválido"),
})

export default leitorSchema;