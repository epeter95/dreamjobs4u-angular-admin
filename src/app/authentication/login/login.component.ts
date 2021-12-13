import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/general-components/dialog/dialog.component';
import { DataService } from 'src/app/site-services/data.service';
import { RoleService } from 'src/app/site-services/role.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //bejelentkezés form init validátorokkal
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private dataService: DataService,
    public dialog: MatDialog, private roleService: RoleService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
  }
  //bejelentkezés megvalósítása ellenőrzésekkel, megfelelő dialógus megnyitásokkal
  login() {
    if (this.loginForm.valid) {
      this.dataService.postData('/api/auth/login', this.loginForm.value).subscribe(res => {
        if (res.error) {
          this.dialog.open(DialogComponent, {
            data: { icon: 'warning', text: res.error }
          });
          return;
        }
        this.sessionService.createSession(res.token);
        this.roleService.setRole(res.roleHash);
      }, error => {
        if (error.status == 401) {
          this.dialog.open(DialogComponent, {
            data: { icon: 'warning', text: 'Sajnáljuk, hibás a jelszó. Kérjük próbálja újra!' }
          });
          return;
        }
        if (error.status == 403) {
          this.dialog.open(DialogComponent, {
            data: { icon: 'warning', text: 'Ennek a felhasználónak nincs admin szintű hozzáférése!' }
          });
          return;
        }
      });
    }
  }

}
