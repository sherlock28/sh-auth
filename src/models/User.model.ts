import Person from "./Person.model";

interface IUser {
    username: string,
    email: string,
    password: string,
    user_status: boolean;
    remember_token: string
}

class User extends Person implements IUser {

    username: string;
    email: string;
    password: string;
    user_status: boolean;
    remember_token: string;

    constructor(username: string, email: string, password: string, user_status: boolean,
        remember_token: string, firstname: string, lastname: string, gender: string,
        birth_date: Date, phone: string) {
        super(firstname, lastname, gender,
            birth_date, phone);
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_status = user_status;
        this.remember_token = remember_token;
    }
}

export default User;