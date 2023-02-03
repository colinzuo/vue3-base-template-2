import { MockServerUserApi } from './mock-server-user-api';

export * from './user-api';
export * from './mock-server-user-api';

export const gUserApi = new MockServerUserApi();
