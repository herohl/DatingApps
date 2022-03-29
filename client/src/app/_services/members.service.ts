import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userparams';
import { AccountService } from './account.service';
import {getPaginatedResult, getPaginationHeaders} from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  // tslint:disable-next-line: typedef
  getUserParams() {
    return this.userParams;
  }

  // tslint:disable-next-line: typedef
  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  // tslint:disable-next-line: typedef
  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  // tslint:disable-next-line: typedef
  getMembers(userParams: UserParams) {
    // idea to create a key
    // console.log(Object.values(userParams).join('-'));

    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
      // tslint:disable-next-line:no-shadowed-variable
    .pipe(map(response => {
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }));
  }

  // tslint:disable-next-line: typedef
  getMember(username: string){
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      // tslint:disable-next-line:no-shadowed-variable
      .find((member: Member) => member.username === username);
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

  // tslint:disable-next-line:typedef
  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  // tslint:disable-next-line:typedef
  getLikes(predicate: string, pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult(this.baseUrl + 'likes', params, this.http);
  }
}
