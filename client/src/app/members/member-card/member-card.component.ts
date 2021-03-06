import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import {MembersService} from '../../_services/members.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('you have liked' + member.knownAs);
    });
  }

}
