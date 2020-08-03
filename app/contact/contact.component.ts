import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from './contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  contactlist: Contact[];
  contactsearch: Contact[];
  searchtext: string;
  addContact: boolean;
  updateContact: boolean;
  sortContact: boolean;
  myForm: FormGroup;
  sortForm: FormGroup;
  updateForm: FormGroup;

  constructor(private contactSer: ContactService) 
  {
    this.addContact = false;
    this.updateContact = false;
    this.sortContact = false;
    this.contact = new Contact();
    this.contactlist = [];
    this.contactsearch = [];
    this.contactlist = this.contactSer.getContactsList();
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)])
    });
    this.sortForm = new FormGroup({
      sortFactor: new FormControl(1, Validators.required),
      sortType: new FormControl(1, Validators.required)
    });
    this.updateForm = new FormGroup({
      updatedFirstName: new FormControl(null, Validators.required),
      updatedLastName: new FormControl(null, Validators.required),
      updatedPhoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
    });
  }

  ngOnInit(): void {
  }

  public get firstName() {
    return this.myForm.get('firstName');
  }
  public get lastName() {
    return this.myForm.get('lastName');
  }
  public get phoneNumber() {
    return this.myForm.get('phoneNumber');
  }
  public get sortFactor() {
    return this.sortForm.get('sortFactor');
  }
  public get sortType() {
    return this.sortForm.get('sortType');
  }
  public get updatedFirstName() {
    return this.updateForm.get('updatedFirstName');
  }
  public get updatedLastName() {
    return this.updateForm.get('updatedLastName');
  }
  public get updatedPhoneNumber() {
    return this.updateForm.get('updatedPhoneNumber');
  }
  searchContacts() {
    this.contactsearch = this.contactSer.searchContact(this.searchtext ? this.searchtext.toLowerCase(): undefined);
  }
  addNewContacts(choice: number) {
    switch(choice) {
      case 1: {
        if(this.myForm.valid) {
          this.contactSer.addNewContact(new Contact(this.firstName.value, this.lastName.value, this.phoneNumber.value));
          this.myForm.reset();
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.myForm.reset()
        break;
      }
      case 3: {
        this.myForm.reset()
        this.addContact = false;
        break;
      }
    } 
  }
  addBox() {
    this.addContact = true;
  }
  sortBox() {
    this.sortContact = true;
  }
  sortNewContacts(choice: number) {
    switch(choice) {
      case 1: {
        if (this.sortForm.valid) {
          this.contactSer.sortContact(this.sortFactor.value, this.sortType.value);
          this.sortContact = false;
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.sortForm.patchValue({sorton: 1, sorttype: 1});
        break;
      }
      case 3: {
        this.sortForm.patchValue({sorton: 1, sorttype: 1});
        this.sortContact = false;
        break;
      }
    }
  }
  updateBox(c: Contact) {
    this.updateForm.patchValue({
      updatedFirstName: c.firstName,
      updatedLastName: c.lastName,
      updatedPhoneNumber: c.phoneNumber
    });
    this.contact = c;
    this.updateContact = true;
  }
  updateContacts(choice: number) {
    switch(choice) {
      case 1: {
        if (this.updateForm.valid) {
          this.contactSer.updateExistingContact(this.contact, new Contact(this.updatedFirstName.value, this.updatedLastName.value, this.updatedPhoneNumber));
          this.updateContact = false;
          this.contact = new Contact();
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.updateBox(this.contact);
        break;
      }
      case 3: {
        this.updateForm.reset()
        this.updateContact = false;
        break;
      }
    }
  }
  deleteContacts(c: Contact) {
    if (this.contact === c) {
      this.updateContact = false;
      this.contact = new Contact();
    }
    this.contactSer.deleteContact(c);
    this.searchContacts();
  }
}
