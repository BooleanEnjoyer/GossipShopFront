import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthRequest} from "../../../entity/user/request/auth-request";
import {AuthService} from "../../../service/user/auth/auth.service";
import {filter} from "rxjs";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() authRequest: AuthRequest = {
    email: '',
    password: ''
  }

  formGroup!: FormGroup;
  @Output() formSubmitted: EventEmitter<AuthRequest> = new EventEmitter<AuthRequest>();
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
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',
        [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    });
  }

  emailControl(email: string) {
    return this.formGroup.get(email);
  }

  passwordControl(password: string) {
    return this.formGroup.get(password);
  }

  submitForm() {
    if (this.formGroup.valid) {
      if(this.logService.isDebugEnabled()){
        console.log("AUTH INFO " + this.authRequest.email + this.authRequest.password);
      }
      this.userService.login(this.authRequest).subscribe(
        (response) => {
          if(response.token != null){
            if(this.logService.isDebugEnabled()){
              console.log(`Zalogowano pomyślnie ${response}`);
            }
            this.authService.setUserStorage(response.token,response.id,response.userEmail);
            this.formSubmitted.emit(this.authRequest);
            // alert('Pomyślnie zalogowano!')
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
          alert('Błąd przy logowaniu!')
          console.error('Błąd przy logowaniu', error);
        },
        () => {
          this.formGroup.reset();
        }
      );
    } else {
      if(this.logService.isDebugEnabled()){
        console.log('Formularz jest nieprawidłowy. Wypełnij wymagane pola.');
      }
      alert("Logowanie jest nieprawidłowo wypełnione sprawdź poprawność wprowadzonych danych")
    }
  }

  signUpPage(){
    this.formClosed.emit();
    this.formGroup.reset();
    this.router.navigateByUrl('/register');
  }

  closeForm() {
    this.formClosed.emit();
    this.formGroup.reset();
    this.router.navigateByUrl('/dashboard');
  }
}
