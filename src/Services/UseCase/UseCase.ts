import type {ResponseUseCase} from "@/Services/UseCase/ResponseUseCase";

export default interface UseCase {
    execute(args?: unknown): Promise<ResponseUseCase<any, unknown>>;
}