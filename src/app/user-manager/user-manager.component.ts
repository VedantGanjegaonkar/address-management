import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent {
  @Input() users: { userId: number, userName: string, email: string, addresses: { street: string, city: string, state: string, zipCode: string }[] }[] = [];
  @Output() addAddress = new EventEmitter<{ street: string, city: string, state: string, zipCode: string }>();
  @Output() deleteAddress = new EventEmitter<number>();
  @Output() updateAddress = new EventEmitter<{ index: number, address: { street: string, city: string, state: string, zipCode: string } }>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder,private dataService: DataService) {
    this.userForm = this.fb.group({
      userId: '',
      userName: '',
      email: '',
      addresses: this.fb.array([])
    });
  }

  get addresses() {
    return this.userForm.get('addresses') as FormArray;
  }

  addNewAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  createAddressGroup() {
    return this.fb.group({
      street: '',
      city: '',
      state: '',
      zipCode: ''
    });
  }

  deleteAddressAt(index: number) {
    this.addresses.removeAt(index);
    this.deleteAddress.emit(index);
  }

  onAddressChange(index: number) {
    const address = this.addresses.at(index).value;
    this.updateAddress.emit({ index, address });
  }
  onSubmit() {
    this.addAddress.emit()
    console.log('Form Data:', this.userForm.value);

    this.dataService.addUser(this.userForm.value).subscribe(
      response => {
        console.log('User saved successfully!', response);
        this.userForm.reset();
        window.location.reload();        // reloading after submiting, need to chanage this 
       
      },
      error => {
        console.error('Error saving user!', error);
      }
    );
  }

}