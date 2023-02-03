import type { FormLoginParam } from "@/model/dto/ums";

export interface UserService {
  formLogin(data: FormLoginParam): Promise<void>;
}
