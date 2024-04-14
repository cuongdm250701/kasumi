import { ApiError } from '@models/api.error';
import { AppState } from '@models/app.state';
import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { Context, Middleware, Next, ParameterizedContext } from 'koa';
import { ResponseCodeEnum } from '@models/enum/response-code.enum';
import { config } from '@config/app';
import { User } from '@models/user';
import { logger } from '@config/logger';

export const Authorized = (): Middleware => {
    return async (ctx: ParameterizedContext<AppState, Context>, next: Next) => {
        if (!ctx.headers.authorization)
            throw new ApiError(ResponseCodeEnum.UNAUTHORIZED);

        try {
            const token = ctx.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwt_secret);

            ctx.state.token = token;
            ctx.state.user = plainToClass(User, decoded);

            // TODO: check Permission
        } catch (error) {
            if (error instanceof ApiError) throw error;

            logger.info('Token verify failed');
            throw new ApiError(ResponseCodeEnum.UNAUTHORIZED);
        }

        await next();
    };
};
