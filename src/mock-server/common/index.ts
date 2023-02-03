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
}
