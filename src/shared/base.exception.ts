import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
    constructor(
        private readonly _code: number,
        private readonly _message: string,
    ) {
        super(_message, _code);
    }
}
