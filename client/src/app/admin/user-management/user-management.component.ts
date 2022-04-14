import { Component, OnInit } from '@angular/core';
import {User} from '../../_models/user';
import {AdminService} from '../../_services/admin.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {RolesModelComponent} from '../../modals/roles-model/roles-model.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  // tslint:disable-next-line:typedef
  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    });
  }

  // tslint:disable-next-line:typedef
  openRolesModal(){
    const initialState = {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(RolesModelComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
