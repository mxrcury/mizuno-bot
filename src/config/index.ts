import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from "zod";

const logger = new Logger()

const { parsed } = config({ path: '.env' })

const envSchema = z.object({
    BOT_TOKEN: z.string()
})

type EnvSchema = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse( expand({ parsed }).parsed )

if(parsedEnv.success === false) {
    logger.error('Something went wrong during parsing envs')
    process.exit(1)
}


export const env = parsedEnv.data