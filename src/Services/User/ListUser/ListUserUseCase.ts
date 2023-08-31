import type UserRepository from "@/Services/User/UserRepository";
import type ListUser from "@/Services/User/ListUser/ListUser";
import type UserStructure from "@/Services/User/UserStructure";
import type UseCase from "@/Services/UseCase/UseCase";
import type { ResponseUseCase } from "@/Services/UseCase/ResponseUseCase";
export default class ListUserUseCase implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<ResponseUseCase<'users', ListUser[]>> {
    try {
        const users: UserStructure[] = await this.userRepository.all();
        return {
          success: true,
          users: this.sortByName(this.getUsersForComponent(users)),
        }
    } catch (e) {
        return { success: false, error: e };
    }
  }

  private getUsersForComponent(users: UserStructure[]): ListUser[] {
      return users.map((user: UserStructure) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
      }));
  }

  private sortByName(users: ListUser[]): ListUser[] {
      return users.sort((user1, user2) => user1.name > user2.name ? 1 : -1);
  }
}
