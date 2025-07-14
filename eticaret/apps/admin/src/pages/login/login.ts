import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { API_URL } from '../../constants'
import { UserModel } from '@shared/models/user.model';
import { FlexiToastService } from 'flexi-toast';
import { Router } from '@angular/router';

@Component({
  imports: [
    FormsModule,
  ],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);


  signIn(form: NgForm){
    if(!form.valid) return;

    const endpoind = `${API_URL}/users?userName=${form.value['userName']}&password=${form.value['password']}`;
    this.#http.get<UserModel[]>(endpoind).subscribe(res => {
      if(res.length===0){
        this.#toast.showToast("Hata", "kullanıcı adı ya da şifre yanlış", "error");
        return;
      }else if(!res[0].isAdmin){
        this.#toast.showToast("Hata", "Bu kullanıcının giriş yapmaya yetkisi yok", "error");
        return;
      }else{
        this.#toast.showToast("Hoş Geldiniz!", "Başarıyla giriş yaptınız. Yönlendiriliyorsunuz...", "success");

        localStorage.setItem("response", JSON.stringify(res[0]));
        this.#router.navigateByUrl("/");
      }
   });
  }
}
