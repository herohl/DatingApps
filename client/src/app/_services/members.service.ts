import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getMembers(){
    if (this.members.length > 0) { return of (this.members); }
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  // tslint:disable-next-line: typedef
  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) { return of(member); }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // tslint:disable-next-line: typedef
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  // tslint:disable-next-line: typedef
  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  // tslint:disable-next-line: typedef
  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

}
