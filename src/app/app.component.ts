import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users = [
    {
      userId: 1,
      userName: 'Jane Smith',
      email: 'jane.smith@example.com',
      addresses: [
        { street: '789 Maple St', city: 'Capital City', state: 'IL', zipCode: '62703' }
      ]
    }
  ];

  onAddAddress(address: { street: string, city: string, state: string, zipCode: string }) {
    // Handle adding an address
    // console.log('Add address:', address);
    this.users[0].addresses.push(address);
    console.log("Users :"+this.users[0]);
    
  }

  onDeleteAddress(index: number) {
    // Handle deleting an address
    // console.log('Delete address at index:', index);
    this.users[0].addresses.splice(index, 1);
  }

  onUpdateAddress(event: { index: number, address: { street: string, city: string, state: string, zipCode: string } }) {
    const { index, address } = event;
    // Handle updating an address
    // console.log('Update address at index:', index, 'with', address);
  }
}