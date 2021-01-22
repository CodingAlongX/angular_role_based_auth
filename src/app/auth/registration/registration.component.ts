import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role} from '../models/role.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  role: Role = new Role();

  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.email],
    firstName: [''],
    lastName: [''],
    roles: [''],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: [this.comparePasswords]})
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  comparePasswords(fg: FormGroup): void {
    const password = fg.get('password');
    const confirmPassword = fg.get('confirmPassword');

    if (confirmPassword.errors == null || 'passwordMismatch' in confirmPassword.errors) {
      if (confirmPassword.value !== password.value) {
        confirmPassword.setErrors({passwordMismatch: true});
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
