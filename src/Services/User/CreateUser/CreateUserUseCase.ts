import type UseCase from "@/Services/UseCase/UseCase";
import type {ResponseUseCase} from "@/Services/UseCase/ResponseUseCase";
import type UserStructure from "@/Services/User/UserStructure";
import type UserRepository from "@/Services/User/UserRepository";

export default class CreateUserUseCase implements UseCase {
  /**
   * El user repository es una dependencia del caso de uso.
   */
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute (user: UserStructure): Promise<ResponseUseCase<never, never>> {
    try {
      /**
       * aquí tratariamos, si fuera necesario los datos para
       * mandarselos a la api. En este caso no hace falta peusto
       * que la estructura que espera la api es la misma que se usa.
       * He incluso, se podría validar que los parametros son correctos
       * tanto si los requeridos están, como validación de email, strings,...
       */
      await this.userRepository.save(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'ErrorCreatingUser' };
    }
  }
}
