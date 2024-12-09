/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.TokenSaleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.createMany(input as any))),

        create: procedure.input($Schema.TokenSaleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.create(input as any))),

        deleteMany: procedure.input($Schema.TokenSaleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.deleteMany(input as any))),

        delete: procedure.input($Schema.TokenSaleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.delete(input as any))),

        findFirst: procedure.input($Schema.TokenSaleInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).tokenSale.findFirst(input as any))),

        findMany: procedure.input($Schema.TokenSaleInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).tokenSale.findMany(input as any))),

        findUnique: procedure.input($Schema.TokenSaleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).tokenSale.findUnique(input as any))),

        updateMany: procedure.input($Schema.TokenSaleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.updateMany(input as any))),

        update: procedure.input($Schema.TokenSaleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tokenSale.update(input as any))),

        count: procedure.input($Schema.TokenSaleInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).tokenSale.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TokenSaleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TokenSaleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TokenSaleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TokenSaleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TokenSaleGetPayload<T>, Context>) => Promise<Prisma.TokenSaleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TokenSaleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TokenSaleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TokenSaleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TokenSaleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TokenSaleGetPayload<T>, Context>) => Promise<Prisma.TokenSaleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TokenSaleFindFirstArgs, TData = Prisma.TokenSaleGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TokenSaleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TokenSaleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TokenSaleFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TokenSaleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TokenSaleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TokenSaleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TokenSaleFindManyArgs, TData = Array<Prisma.TokenSaleGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TokenSaleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TokenSaleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TokenSaleFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TokenSaleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TokenSaleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TokenSaleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TokenSaleFindUniqueArgs, TData = Prisma.TokenSaleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TokenSaleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TokenSaleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TokenSaleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TokenSaleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TokenSaleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TokenSaleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TokenSaleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TokenSaleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TokenSaleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TokenSaleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TokenSaleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TokenSaleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TokenSaleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TokenSaleGetPayload<T>, Context>) => Promise<Prisma.TokenSaleGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TokenSaleCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TokenSaleCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TokenSaleCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TokenSaleCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TokenSaleCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TokenSaleCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TokenSaleCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TokenSaleCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
