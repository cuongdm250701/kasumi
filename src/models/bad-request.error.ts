import { config } from '@config/app';
import { getMessage, ResponseCodeEnum } from '@models/enum/response-code.enum';

import { ResponsePayload } from '@models/response-payload';
import { ResponseBuilder } from '@src/ultis/response-builder';

export class BadRequestError extends Error {
  private _errorCode: ResponseCodeEnum;

  private _message: string | undefined;

  private _debug: unknown;

  constructor(errorCode: ResponseCodeEnum, message?: string) {
    super(message);

    this._errorCode = errorCode;
    this._message = message;
  }

  get errorCode(): ResponseCodeEnum {
    return this._errorCode;
  }

  get message(): string {
    return this._message || getMessage(this._errorCode);
  }

  debug(data: unknown): BadRequestError {
    if (config.environment == 'development') {
      this._debug = data;
    }

    return this;
  }

  toResponse(): ResponsePayload<unknown> {
    return new ResponseBuilder<unknown>()
      .error()
      .withCode(this._errorCode)
      .withMessage(this.message)
      .withDebug(this._debug)
      .build();
  }
}
