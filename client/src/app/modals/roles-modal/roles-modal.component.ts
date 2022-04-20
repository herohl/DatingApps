import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-model',
  templateUrl: './roles-model.component.html',
  styleUrls: ['./roles-model.component.css']
})
export class RolesModelComponent implements OnInit {
  title: string;
  list: any[] = [];
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
