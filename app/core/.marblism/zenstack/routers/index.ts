/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createProjectRouter from "./Project.router";
import createTeamMemberRouter from "./TeamMember.router";
import createTokenSaleRouter from "./TokenSale.router";
import createInvestmentRouter from "./Investment.router";
import createWalletRouter from "./Wallet.router";
import createTransactionRouter from "./Transaction.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as ProjectClientType } from "./Project.router";
import { ClientType as TeamMemberClientType } from "./TeamMember.router";
import { ClientType as TokenSaleClientType } from "./TokenSale.router";
import { ClientType as InvestmentClientType } from "./Investment.router";
import { ClientType as WalletClientType } from "./Wallet.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        project: createProjectRouter(router, procedure),
        teamMember: createTeamMemberRouter(router, procedure),
        tokenSale: createTokenSaleRouter(router, procedure),
        investment: createInvestmentRouter(router, procedure),
        wallet: createWalletRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    project: ProjectClientType<AppRouter>;
    teamMember: TeamMemberClientType<AppRouter>;
    tokenSale: TokenSaleClientType<AppRouter>;
    investment: InvestmentClientType<AppRouter>;
    wallet: WalletClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
