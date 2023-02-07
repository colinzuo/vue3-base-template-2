import type { ErrorInfo } from "@/model/dto/common";


export const defaultPageQueryParam = {
  pageSize: 10,
  pageNum: 1,
};

export class CommonError {
  static RES_UNAUTHORIZED: ErrorInfo = {
    code: 401,
    message: 'RES_UNAUTHORIZED',
  };

  static RES_ILLEGAL_ARGUMENT: ErrorInfo = {
    code: 1002,
    message: 'RES_ILLEGAL_ARGUMENT',
  };

  static RES_NAME_ALREADY_EXIST: ErrorInfo = {
    code: 1003,
    message: 'RES_NAME_ALREADY_EXIST',
  };

  static RES_EMAIL_IN_USE: ErrorInfo = {
    code: 1008,
    message: 'RES_EMAIL_IN_USE',
  };
}
