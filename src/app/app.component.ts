import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';


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
        'email': new FormControl(null, [Validators.email, Validators.required])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.singUpForm);
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
}
