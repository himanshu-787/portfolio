import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be under 2000 characters."),
  website: z.string().max(200).optional(), // honeypot: real users never fill this
  startedAt: z.number().optional(), // when the form was opened (ms)
});

export type ContactInput = z.infer<typeof contactSchema>;