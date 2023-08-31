import ListUserUseCase from "@/Services/User/ListUser/ListUserUseCase";
import UserRepositoryApi from "@/Services/User/UserRepositoryApi";
import GetUserUseCase from "@/Services/User/GetUser/GetUserUseCase";
import DeleteUserUseCase from "@/Services/User/RemoveUser/DeleteUserUseCase";

export const listUserUseCase = new ListUserUseCase(new UserRepositoryApi());
export const getUserUseCase = new GetUserUseCase(new UserRepositoryApi());
export const deleteUserUseCase = new DeleteUserUseCase(new UserRepositoryApi())