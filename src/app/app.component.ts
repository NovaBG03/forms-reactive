import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {log} from 'util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  invalidUsernames = ['John', 'Anna'];
  singUpForm: FormGroup;

  ngOnInit(): void {
    this.singUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.nameValidator.bind(this)]),
        'email': new FormControl(null,
          [Validators.email, Validators.required],
          [this.emailValidator])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.singUpForm.patchValue({
      userData: {
        username: 'Ivan'
      }
    });
  }

  onSubmit() {
    console.log(this.singUpForm);
    this.singUpForm.reset({'gender': 'male'});
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singUpForm.get('hobbies')).push(control);
  }

  getAllHobbies() {
    return (<FormArray>this.singUpForm.get('hobbies')).controls;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (this.invalidUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  emailValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
