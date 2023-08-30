import ListUserUseCase from "@/Services/User/ListUser/ListUserUseCase";
import UserRepositoryApi from "@/Services/User/UserRepositoryApi";

export const listUserUseCase = new ListUserUseCase(new UserRepositoryApi());