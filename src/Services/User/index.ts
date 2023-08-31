import ListUserUseCase from "@/Services/User/ListUser/ListUserUseCase";
import UserRepositoryApi from "@/Services/User/UserRepositoryApi";
import GetUserUseCase from "@/Services/User/GetUser/GetUserUseCase";
import DeleteUserUseCase from "@/Services/User/RemoveUser/DeleteUserUseCase";
import CreateUserUseCase from "@/Services/User/CreateUser/CreateUserUseCase";

export const listUserUseCase = new ListUserUseCase(new UserRepositoryApi());
export const getUserUseCase = new GetUserUseCase(new UserRepositoryApi());
export const deleteUserUseCase = new DeleteUserUseCase(new UserRepositoryApi());

export const createUserUseCase = new CreateUserUseCase(new UserRepositoryApi());
