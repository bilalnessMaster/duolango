import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
export const appRouter = createTRPCRouter({
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
