export interface User {
    userId?: number;
    email: string;
    password: string;
    name: string;
    address: string;
    phoneNumber: string;
    isAdmin: number // 0 - regular user, 1 - amdin
}