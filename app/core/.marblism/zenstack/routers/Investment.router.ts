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

        createMany: procedure.input($Schema.InvestmentInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.createMany(input as any))),

        create: procedure.input($Schema.InvestmentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.create(input as any))),

        deleteMany: procedure.input($Schema.InvestmentInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.deleteMany(input as any))),

        delete: procedure.input($Schema.InvestmentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.delete(input as any))),

        findFirst: procedure.input($Schema.InvestmentInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).investment.findFirst(input as any))),

        findMany: procedure.input($Schema.InvestmentInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).investment.findMany(input as any))),

        findUnique: procedure.input($Schema.InvestmentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).investment.findUnique(input as any))),

        updateMany: procedure.input($Schema.InvestmentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.updateMany(input as any))),

        update: procedure.input($Schema.InvestmentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investment.update(input as any))),

        count: procedure.input($Schema.InvestmentInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).investment.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.InvestmentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.InvestmentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestmentGetPayload<T>, Context>) => Promise<Prisma.InvestmentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.InvestmentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.InvestmentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestmentGetPayload<T>, Context>) => Promise<Prisma.InvestmentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.InvestmentFindFirstArgs, TData = Prisma.InvestmentGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.InvestmentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InvestmentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestmentFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InvestmentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InvestmentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InvestmentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.InvestmentFindManyArgs, TData = Array<Prisma.InvestmentGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.InvestmentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.InvestmentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestmentFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InvestmentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.InvestmentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.InvestmentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.InvestmentFindUniqueArgs, TData = Prisma.InvestmentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InvestmentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InvestmentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestmentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InvestmentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InvestmentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InvestmentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.InvestmentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.InvestmentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestmentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestmentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestmentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestmentGetPayload<T>, Context>) => Promise<Prisma.InvestmentGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.InvestmentCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InvestmentCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.InvestmentCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.InvestmentCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.InvestmentCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.InvestmentCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.InvestmentCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InvestmentCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
