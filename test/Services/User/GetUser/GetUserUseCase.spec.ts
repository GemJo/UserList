import {describe, it, expect, vi, beforeEach } from 'vitest';
import GetUserUseCase from "../../../../src/Services/User/GetUser/GetUserUseCase";

const providers = [
    {
        fromApi: {
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
        expected: {
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
                },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        },
    },
    {
        fromApi: {
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
        expected: {
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
    }
];

const userRepository = { retrieve: vi.fn() };
const getUserUseCase = new GetUserUseCase(userRepository);
describe('Get user and repository fails', () => {
    beforeEach(() => {
        userRepository.retrieve.mockRejectedValue();
    });

    it('must return success false', async () => {
        const response = await getUserUseCase.execute();
        expect(response.success).toBe(false);
    });

    it('must return error', async () => {
        const response = await getUserUseCase.execute();
        expect(response.error).toBe('ErrorRetrievingUser');
    });

    it('should not return user', async () => {
        const response = await getUserUseCase.execute();
        expect(response.user).toBeUndefined();
    });
});
describe.each(providers)('Get user', (provider) => {
    beforeEach(() => {
        userRepository.retrieve.mockResolvedValue(provider.fromApi);
    });

    it('must return success true', async () => {
        const response = await getUserUseCase.execute();
        expect(response.success).toBe(true);
    });

    it('should not return users collection', async () => {
        const response = await getUserUseCase.execute();
        expect(response.user).toStrictEqual(provider.expected);
    });
});
