import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeleteUserUseCase from "../../../../src/Services/User/RemoveUser/DeleteUserUseCase";

const id: string = '2';

const userRepository = { remove: vi.fn() };
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
describe('Delete user and repository fails', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        userRepository.remove.mockRejectedValue();
    });

    it('must return success false', async () => {
        const response = await deleteUserUseCase.execute(id);
        expect(response.success).toBe(false);
    });

    it('must return error', async () => {
        const response = await deleteUserUseCase.execute(id);
        expect(response.error).toBe('ErrorDeletingUser');
    });
});
describe('Get user and works', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        userRepository.remove.mockResolvedValue();
    });

    it('must return success true', async () => {
        const response = await deleteUserUseCase.execute(id);
        expect(response.success).toBe(true);
    });

    it('should not return error', async () => {
        const response = await deleteUserUseCase.execute(id);
        expect(response.error).toBeUndefined();
    });

    it('must call remove method with same id', async () => {
        await deleteUserUseCase.execute(id);
        expect(userRepository.remove).toHaveBeenCalledTimes(1);
        expect(userRepository.remove).toHaveBeenCalledWith(id);
    });
});
