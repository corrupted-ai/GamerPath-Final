import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService, User } from '../httpservice.service';
import { MustMatch } from '../confirm-equal-validator.directive';
import { Router } from '@angular/router'
declare var $: any;
@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css']
})
export class LoginsignupComponent implements OnInit {

  gender: string
  loginEmail: string
  loginPassword: string
  login: string[] = []
  loginerror: boolean = false
  signuperror: boolean = false
  user: User = new User("", "", "", "", "","","")
  signupForm: FormGroup;
  loginForm: FormGroup;
  submission = false;
  entry = false;
  constructor(private fb: FormBuilder, private b: FormBuilder, private httpService: HttpserviceService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      gamertag: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
      ]],
      confirmpassword: ['', Validators.required],
      gender: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    },
      { validator: MustMatch('password', 'confirmpassword') }
    );

    this.loginForm = this.b.group({
      loginpassword: ['', Validators.required],
      loginemail: ['', [Validators.required, Validators.email]],

    }
    );
    // console.log("Oninit of loginsignup")
  }
  get errormessage() {
    return this.signupForm.controls;
  }
  get emsg() {
    return this.loginForm.controls;
  }

  onSignup() {
    this.user["gamertag"]=this.signupForm.get("gamertag").value
    this.user["name"]=this.signupForm.get("name").value
    this.user["email"]=this.signupForm.get("email").value
    this.user["password"]=this.signupForm.get("password").value
    this.user["securityquestion"]=this.signupForm.get("question").value
    this.user["securityanswer"]= this.signupForm.get("answer").value



    this.submission = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.createUser();
  }

  onLogin() {
    this.loginEmail = this.loginForm.get("loginemail").value;
    this.loginPassword=this.loginForm.get("loginpassword").value;
    this.entry = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if(this.loginEmail =="admin@dxc.com" && this.loginPassword == "admin"){
      this.router.navigate(['/admin'])
    }
    else{
      this.loginUser();
    }
  

  }
  onReset() {
    this.submission = false;
    this.signupForm.reset();
  }

  change(input: string) {
    this.gender = input
  }
  createUser(): void {
    this.user["gender"] = this.gender
    this.httpService.emailcheck(this.user["email"]).subscribe(response => this.emailResponse(response))
  }

  loginUser(): void {
  
    this.login[0] = this.loginEmail
    this.login[1] = this.loginPassword
    this.httpService.loginUser(this.login).subscribe(response => this.successResponse(response));

  }

  successResponse(response) {
    console.log("Success Response")
    if (response) {
      this.httpService.validateUser(this.loginEmail).subscribe(response => this.handleResponse(response));
    }
    else {
      console.log("Toggle")
      this.loginerror = true;
      console.log(this.loginerror)
      $("#loginform").trigger("reset")
    }
  }
  emailResponse(response) {
    console.log("email Response")
    if (response) {
      this.httpService.createUser(this.user).subscribe(response => this.handleResponse(response));
    }
    else {
      console.log("Toggle")
      this.signuperror = true;
      console.log(this.signuperror)
    }
  }
  handleResponse(response) {
    console.log("Handle Response")
    localStorage.setItem("user", JSON.stringify(response))
    localStorage.setItem("loggedin", "true")
    this.router.navigate(['/homepage'])
  }

}


