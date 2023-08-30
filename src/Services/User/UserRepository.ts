import type UserStructure from "@/Services/User/UserStructure";

export default interface UserRepository {
  all(): Promise<UserStructure[]>;
}
