import { Component, OnInit } from '@angular/core';
import {Member} from '../_models/member';
import {MembersService} from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  // tslint:disable-next-line:typedef
  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe(response => {
      this.members = response;
    });
  }
}
