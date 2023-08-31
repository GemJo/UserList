import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateUserUseCase from "../../../../src/Services/User/CreateUser/CreateUserUseCase";
import UserStructure from "../../../../src/Services/User/UserStructure";

const user: UserStructure = {
    id: null,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
        street: "Skiles Walks",
        suite: "Suite 351",
        city: "Roscoeview",
        zipcode: "33263",
        geo: {
            lat: "-31.8129",
            lng: "62.5342"
        }
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
        name: "Keebler LLC",
        catchPhrase: "User-centric fault-tolerant solution",
        bs: "revolutionize end-to-end systems"
    }
};

const userRepository = { save: vi.fn() };
const createUserUseCase = new CreateUserUseCase(userRepository);

describe('Create user and repository fails', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        userRepository.save.mockRejectedValue();
    });

    it('must return success false', async () => {
        const response = await createUserUseCase.execute(user);
        expect(response.success).toBe(false);
    });

    it('must return error', async () => {
        const response = await createUserUseCase.execute(user);
        expect(response.error).toBe('ErrorCreatingUser');
    });
});
describe('Create user and works', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        userRepository.save.mockResolvedValue();
    });

    it('must return success true', async () => {
        const response = await createUserUseCase.execute(user);
        expect(response.success).toBe(true);
    });

    it('should not return error', async () => {
        const response = await createUserUseCase.execute(user);
        expect(response.error).toBeUndefined();
    });

    it('must call save method with user passed', async () => {
        await createUserUseCase.execute(user);
        expect(userRepository.save).toHaveBeenCalledTimes(1);
        expect(userRepository.save).toHaveBeenCalledWith(user);
    });
});
