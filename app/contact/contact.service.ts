import { Contact } from './contact';

export class ContactService{
    contactlist: Contact[];
    contactsearch: Contact[];

    constructor()
    {
        this.contactlist=[];
        this.contactsearch=[];
        var contact1, contact2, contact3, contact4;
        contact1 = new Contact();
        contact1.firstName = "Lipika";
        contact1.secondName = "Dhiman";
        contact1.phoneNumber = 2327463731;
        contact2 = new Contact();
        contact2.firstName = "Sanjana";
        contact2.secondName = "Dhiman";
        contact2.phoneNumber = 5284639261;
        contact3 = new Contact();
        contact3.firstName = "Manish";
        contact3.secondName = "Kumar";
        contact3.phoneNumber = 9494594523;
        contact4 = new Contact();
        contact4.firstName = "Gyana";
        contact4.secondName = "Sai";
        contact4.phoneNumber = 7742654734;
        this.contactlist.push(contact1);
        this.contactlist.push(contact2);
        this.contactlist.push(contact3);
        this.contactlist.push(contact4);
    } 
    //for retriving the list of contacts
    getContactsList(): Contact[] {
        return this.contactlist;
    }
    //for adding a new contact
    addNewContact(newcontact: Contact):Contact[]
    {   
        this.contactlist.push(newcontact);
        return this.contactlist;
    }
    //for updating a particular contact
    updateExistingContact(c: Contact, updatedContactDetails: Contact): Contact[] {
        this.contactlist.forEach( (contact, index) => {
            if (contact === c)
                this.contactlist[index] = updatedContactDetails;
        });
        return this.contactlist;
    }
    //for deleteing an existing account
    deleteContact(c: Contact): Contact[] {
        for(let index=0; index<this.contactlist.length;index++)
        {
            if(c.phoneNumber == this.contactlist[index].phoneNumber)
            {   
                const i=index;
                this.contactlist.splice(i,1);
                break;
            }
        }
        return this.contactlist;
    }  
    //search a contact
    searchContact(text?: string): Contact[]{
        this.contactsearch = [];
        if (text == "")
            return this.contactlist;
        this.contactlist.forEach(contact => {
            if ((contact.firstName + " " + contact.lastName + " " + contact.phoneNumber).toLowerCase().includes(text))
                this.contactsearch.push(contact)
        });
        return this.contactsearch;
    }
    //for sorting in ascending/descending order based on contacts firstname/number
    sortContact(sortFactor: number, sortType: number): Contact[]{
        this.contactlist.sort((a, b) => {
            if (sortFactor == 1) {
                //sorting on the basis of first name
                if (sortType == 1)
                    return (a.firstName + " " + a.lastName).toLowerCase() > (b.firstName + " " + b.lastName).toLowerCase() ? 1 : -1;
                else
                    return (a.firstName + " " + a.lastName).toLowerCase() > (b.firstName + " " + b.lastName).toLowerCase() ? -1 : 1;
            }
            //sorting on the basis of number
            else {
                if (sortType == 1)
                    return a.phoneNumber > b.phoneNumber ? 1 : -1;
                else
                    return a.phoneNumber > b.phoneNumber ? -1 : 1;
            }
        });
        return this.contactlist;
    }

}