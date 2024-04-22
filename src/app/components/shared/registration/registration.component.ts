import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../../../entity/user/request/register-request";
import {Address} from "../../../entity/address/address";
import {UserService} from "../../../service/user/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../service/user/auth/auth.service";
import {filter} from "rxjs";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registrationRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    address: new Address('','','','','',''),
    password: ''
  }

  formGroup!: FormGroup;
  @Output() formSubmitted: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();


  constructor(private userService: UserService, private router: Router,
              private authService: AuthService, private logService: LogService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnInit(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.formGroup = new FormGroup({

      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      password: new FormControl('', [Validators.required, Validators.pattern(passwordPattern)]),

      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]),
    });
  }

  firstNameControl(firstName : string) {return this.formGroup.get(firstName);}
  lastNameControl(lastName : string) {return this.formGroup.get(lastName);}
  emailControl(email : string) {return this.formGroup.get(email);}
  phoneNumberCodeControl(phoneNumber : string) {return this.formGroup.get(phoneNumber);}
  passwordControl(password : string) {return this.formGroup.get(password);}

  cityControl(city : string) {return this.formGroup.get(city);}
  streetControl(street : string) {return this.formGroup.get(street);}
  houseNumberControl(houseNumber : string) {return this.formGroup.get(houseNumber);}
  zipCodeControl(zipConde : string) {return this.formGroup.get(zipConde);}

  submitForm() {
    if (this.formGroup.valid){
      if(this.logService.isDebugEnabled()){
        console.log("USER INFO " + this.registrationRequest.firstName + this.registrationRequest.lastName
          + this.registrationRequest.email + this.registrationRequest.phone + this.registrationRequest.password);
        console.log("USER ADDRESS " + this.registrationRequest.address.street + this.registrationRequest.address.city
          + this.registrationRequest.address.houseNumber + this.registrationRequest.address.zipCode);
      }
      const confirmed = confirm('Napewno chcesz się zarejestrować?');
      if(confirmed) {
        this.userService.register(this.registrationRequest).subscribe(
          (response) => {
            if (response.token != null){
              if(this.logService.isDebugEnabled()){
                console.log(`Zarejestrowano pomyślnie ${response}`);
              }
              this.authService.setUserStorage(response.token,response.id,response.userEmail);
              this.formSubmitted.emit(this.registrationRequest);
              this.router.navigateByUrl('/dashboard');
            }
          },
          (error) => {
            alert('Błąd przy rejestracji!')
            console.error('Błąd przy rejestracji', error);
          },
          () => {
            this.formGroup.reset();
          }
        );
      }
    } else {
      if(this.logService.isDebugEnabled()){
        console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      }
      alert("Rejestracja jest nieprawidłowo wypełniona sprawdź poprawność wprowadzonych danych")
    }
  }

  closeForm() {
    this.formClosed.emit();
    this.formGroup.reset();
    this.router.navigateByUrl('/dashboard');
  }
}

