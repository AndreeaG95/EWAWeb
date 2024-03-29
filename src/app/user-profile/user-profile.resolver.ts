import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class UserProfileResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => {
          if (res.providerData[0].providerId === 'password') {
            // TODO(): change this !
            user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          } else {
            user.image = res.photoURL;
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          }
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        });
    });
  }
}
