import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  loggedInUser()
  {
    return from(new Promise<User>((resolve, reject) => {
      const user = {
        id: 1,
        email: "my@email.com",
        username: "Ad Min"
      }
      resolve(user);
    }));
  }
}
