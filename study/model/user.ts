import { Auth, RolesType } from "../types/auth";

export class User implements Auth {

    id: string;
    email?: string | undefined;
    salt: string;
    hash: string;
    role: RolesType[];

    constructor(id: string, email: string, salt: string, hash: string, role: RolesType[]) {
        this.id = id;
        this.email = email;
        this.salt = salt;
        this.hash = hash;
        this.role = role;
    }
}