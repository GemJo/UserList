import type UseCase from "@/Services/UseCase/UseCase";
import type {ResponseUseCase} from "@/Services/UseCase/ResponseUseCase";
import type UserRepository from "@/Services/User/UserRepository";

export default class DeleteUserUseCase implements UseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<ResponseUseCase<never, never>> {
    try {
      await this.userRepository.remove(id);
      return { success: true };
    } catch (e) {
      /**
       * Lo ideal sería captar el error de la api y poder mostrarselo
       * al usuario con detalle o gestinarlo según el error dado.
       */
      return { success: false, error: 'ErrorDeletingUser' };
    }
  }
}
