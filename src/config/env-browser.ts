/* c8 ignore start */

import { z } from 'zod';

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  NEXT_PUBLIC_SITE_ENV: z.enum(['test', 'production']),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SITE_ENV: process.env.NEXT_PUBLIC_SITE_ENV,
});

if (!parsedEnv.success) {
  const message = '❌ Invalid environment variables:';
  const error = JSON.stringify(parsedEnv.error.format(), null, 4);
  // eslint-disable-next-line no-console
  console.error(message, error);
  throw new Error(message, { cause: error });
}

export const env = parsedEnv.data;

/* c8 ignore stop */
