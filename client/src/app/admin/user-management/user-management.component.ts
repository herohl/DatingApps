import { Component, OnInit } from '@angular/core';
import {User} from '../../_models/user';
import {AdminService} from '../../_services/admin.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {RolesModalComponent} from '../../modals/roles-modal/roles-modal.component';
import {initialState} from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';

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
  openRolesModal(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate){
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles];
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles ){
        if (role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch){
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }

}
