import type UserStructure from "@/Services/User/UserStructure";

export default interface UserRepository {
  all(): Promise<UserStructure[]>;
  retrieve(id: string): Promise<UserStructure>;
  remove(id: string): Promise<void>;
}
