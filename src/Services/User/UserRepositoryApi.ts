import RestAction from "@/Services/RestActions/RestAction";
import type UserRepository from "@/Services/User/UserRepository";
import type UserStructure from "@/Services/User/UserStructure";
import { useUserStore } from "@/stores/user";

const URL: string = 'users';
export default class UserRepositoryApi extends RestAction implements UserRepository {
  private readonly userStore = useUserStore();
  public async all(): Promise<UserStructure[]> {
    let users: UserStructure[] = this.userStore.getAll();

    if (users.length) {
      return users;
    }

    users = await this.get(`${URL}`) as UserStructure[];
    useUserStore().setAll(users);
    return users;
  }

  public async retrieve(id: string): Promise<UserStructure> {
    let user: UserStructure = this.userStore.get(id);

    if (user !== undefined) {
      return user;
    }

    user = await this.get(`${URL}/${id}`) as UserStructure;
    this.userStore.set(user);

    return user;
  }

  public async remove(id: string): Promise<void> {
    await this.delete(`${URL}/${id}`);
    this.userStore.remove(id);
  }
}
