interface IPerson {
    firstname: string,
    lastname: string,
    gender: string,
    birth_date: Date
    phone: string
}

class Person implements IPerson {

    firstname: string;
    lastname: string;
    gender: string;
    birth_date: Date;
    phone: string;

    constructor(firstname: string, lastname: string, gender: string,
        birth_date: Date, phone: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birth_date = birth_date;
        this.phone = phone;
    }
}

export default Person;