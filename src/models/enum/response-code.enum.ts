export enum ResponseCodeEnum {
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    BAD_REQUEST = 'BAD_REQUEST',

    CODE_AUTH_FAILED = 'AUTH_FAILED',
    OLD_PASSWORD_IS_CORRECT = 'OLD_PASSWORD_IS_CORRECT',
    WRONG_DATA = 'WRONG_DATA',
}

const CODE_MESSAGES: { [key in ResponseCodeEnum]: string } = {
    NOT_FOUND: '該当のデータが見つかりません。',
    INTERNAL_SERVER_ERROR: '内部サーバーエラー',
    UNAUTHORIZED: 'アクセスが許可されていません',
    FORBIDDEN: 'アクセスは禁止されています。',
    BAD_REQUEST: '不正なリクエストメッセージです。',

    AUTH_FAILED: 'ユーザー名なたはパスワードが正しくありません。',
    OLD_PASSWORD_IS_CORRECT: '旧パスワードが正しくありません。',
    WRONG_DATA: 'ファイルの全データが不正です。',
};

export const getMessage = (code: ResponseCodeEnum): string => {
    return CODE_MESSAGES[code];
};
