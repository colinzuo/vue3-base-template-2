import type { MockServerUserService } from './user-service';
import { MockServerUserServiceImpl } from './user-service-impl';


export const gMockServerUserService: MockServerUserService = new MockServerUserServiceImpl();

console.log('After Create gMockServerUserService');
