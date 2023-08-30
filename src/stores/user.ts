import { defineStore } from "pinia";
import { ref } from "vue";
import type UserStructure from "@/Services/User/UserStructure";


export const useUserStore = defineStore('user', () => {
    const users = ref<{ [key: string]: UserStructure }>({});

    function setAll(usersList: UserStructure[]): void {
        usersList.forEach((user) => {
           users.value[user.id] = user;
        });
    }

    function getAll(): UserStructure[] {
        return Object.values(users.value);
    }

    return { setAll, getAll }
})