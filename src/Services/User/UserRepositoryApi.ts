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

  public async save(user: UserStructure): Promise<void> {
    const response = await this.post(`${URL}`, user);
    /**
     * Al ser un id numérico por lo tanto auto-incremental y queremos
     * guardar el usuario en el store cogemos ese id para seteralo al nuevo
     * usuario antes de guardarlo en el store.
     * Si en vez de id numérico fuera un uuid, se podría generar desde el front con algún
     * plugin en el propio caso de uso y mandarselo a la api.
     */
    user.id = response.id;
    this.userStore.set(user);
  }
}
