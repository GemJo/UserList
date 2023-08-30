import {describe, it, expect, vi, beforeEach,} from 'vitest';
import ListUserUseCase from "../../../../src/Services/User/ListUser/ListUserUseCase";

const usersProvide = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496"
            }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
                lat: "-43.9509",
                lng: "-34.4618"
            }
        },
       phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains"
        }
    },
];
const userExpected =  [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
    },
];

const userRepository = { all: vi.fn() };
const listUserUseCase = new ListUserUseCase(userRepository);
describe('List user and repository fails', () => {
    beforeEach(() => {
        userRepository.all.mockRejectedValue();
    });

    it('must return success false', async () => {
        const response = await listUserUseCase.execute();
        expect(response.success).toBe(false);
    });

    it('should not return users collection', async () => {
        const response = await listUserUseCase.execute();
        expect(response.users).toBeUndefined();
    });
});
describe('List user', () => {
    beforeEach(() => {
        userRepository.all.mockResolvedValue(usersProvide);
    });

    it('must return success true', async () => {
        const response = await listUserUseCase.execute();
        expect(response.success).toBe(true);
    });

    it('should not return users collection', async () => {
        const response = await listUserUseCase.execute();
        expect(response.users).toStrictEqual(userExpected);
    });
});
