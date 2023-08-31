import type UseCase from "@/Services/UseCase/UseCase";
import type {ResponseUseCase} from "@/Services/UseCase/ResponseUseCase";
import type UserStructure from "@/Services/User/UserStructure";
import type UserRepository from "@/Services/User/UserRepository";
import { ElNotification } from "element-plus";

export default class GetUserUseCase implements UseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<ResponseUseCase<'user', UserStructure>> {
    try {
      const user = await this.userRepository.retrieve(id);
      return { success: true, user };
    } catch (e) {
      /*
      * En este caso he probado si se podía lanzar el feedback des de el caso de uso
      * para tener otras posibilidades de gestionarlos
      * */
      ElNotification({
        title: 'Error en la carga',
        message: 'Ha ocurrido un error cargando el usuario',
        type: 'error',
      });
      return { success: false, error: 'ErrorRetrievingUser'};
    }
  }
}
