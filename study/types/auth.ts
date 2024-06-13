export enum RolesType {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

export interface Auth {
    id: string,
    email?: string,
    salt: string;
    hash: string;
    role: RolesType[]
}

