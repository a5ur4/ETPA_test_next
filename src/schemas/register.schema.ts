import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z.string()
        .email('Por favor, insira um email válido')
        .min(1, 'Email é obrigatório'),
    password: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(100, 'Senha deve ter no máximo 100 caracteres'),
    confirmPassword: z.string()
        .min(1, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
