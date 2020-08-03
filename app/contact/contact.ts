export class Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    constructor(firstname?, lastname?, number?) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.phoneNumber = number;
    }
}