import RestAction from "@/Services/RestActions/RestAction";
import type UserRepository from "@/Services/User/UserRepository";
import type UserStructure from "@/Services/User/UserStructure";
import { useUserStore } from "@/stores/user";

const URL: string = 'users';
export default class UserRepositoryApi extends RestAction implements UserRepository {
  public async all(): Promise<UserStructure[]> {
    let users: UserStructure[] = useUserStore().getAll();

    if (users.length) {
      return users;
    }

    users = await this.get(`${URL}`) as UserStructure[];
    useUserStore().setAll(users);
    return users;
  }
}
