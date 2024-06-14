import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../data.service';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  @Input() users: { userId: number, userName: string, email: string, addresses: { street: string, city: string, state: string, zipCode: string }[] }[] = [];
  @Output() addAddress = new EventEmitter<{ userId: number, address: { street: string, city: string, state: string, zipCode: string } }>();
  @Output() deleteAddress = new EventEmitter<{ userId: number, index: number }>();
  @Output() updateAddress = new EventEmitter<{ userId: number, index: number, address: { street: string, city: string, state: string, zipCode: string } }>();
  @Output() saveUser = new EventEmitter<{ userId: number, userName: string, email: string, addresses: { street: string, city: string, state: string, zipCode: string }[] }>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder,private userService:UserService) {
    this.userForm = this.fb.group({
      userId: [null, Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.users && this.users.length > 0) {
      this.setUserForm(this.users[0]);
    }
  }

  get addresses() {
    return this.userForm.get('addresses') as FormArray;
  }

  setUserForm(user: { userId: number, userName: string, email: string, addresses: { street: string, city: string, state: string, zipCode: string }[] }) {
    this.userForm.patchValue({
      userId: user.userId,
      userName: user.userName,
      email: user.email
    });
    this.userForm.setControl('addresses', this.fb.array(user.addresses.map(addr => this.fb.group(addr))));
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
    this.deleteAddress.emit({ userId: this.userForm.value.userId, index });
  }

  onAddressChange(index: number) {
    const address = this.addresses.at(index).value;
    this.updateAddress.emit({ userId: this.userForm.value.userId, index, address });
  }

  onSubmit() {
    this.saveUser.emit(this.userForm.value);
    console.log('Form Data:', this.userForm.value);
    const userData = this.userForm.value;
    // this.userService.createUser(userData);
  }
}
