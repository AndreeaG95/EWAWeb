import {Component, NgModule, OnInit} from '@angular/core';
import {FirebaseUserModel} from '../core/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../core/user.service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})


export class UserProfileComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err));
  }

}
