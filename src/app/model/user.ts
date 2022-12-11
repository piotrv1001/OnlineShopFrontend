export interface User {
    userId?: number;
    email: string;
    password: string;
    name: string;
    address: string;
    phoneNumber: string;
    isAdmin: number // 0 - regular user, 1 - amdin
}

// export class User implements IUser {
//     userId?: number | undefined;
//     email: string;
//     password: string;
//     name: string;
//     address: string;
//     phoneNumber: string;
//     isAdmin: number;
    
//     constructor() {
//         this.email = "";
//         this.password = "";
//         this.name = "";
//         this.address = "";
//         this.phoneNumber = "";
//         this.isAdmin = 0;
//     }
// }