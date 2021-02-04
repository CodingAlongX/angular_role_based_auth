import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {RegistrationDto} from '../dtos/registration.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URI = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
  }

  register(form: FormGroup): Observable<any> {
    const body: RegistrationDto = {
      userName: form.value.userName,
      email: form.value.email,
      password: form.value.passwords.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      roles: form.value.roles
    };

    console.log(body);

    return this.http.post(this.BASE_URI + '/auth/register', body);
  }

  login(formData): any {
    return this.http.post(this.BASE_URI + '/auth/login', formData);
  }

}
