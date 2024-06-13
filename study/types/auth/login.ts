import { User } from "../../model/user";


interface Auth {

    login: (email: string) => User;
}