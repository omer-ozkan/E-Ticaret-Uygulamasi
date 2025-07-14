import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule, NgForm } from '@angular/forms'
import { UserModel, initialUser } from '@shared/models/user.model'
import { FlexiToastService } from 'flexi-toast';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Register {
  readonly data = signal<UserModel>(initialUser);

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router)

  signUp(form:NgForm){
    if(!form.valid) return;

    this.data.update(prev => ({
      ...prev, fullName: `${prev.firstName} ${prev.lastName}`
    }));
    this.#http.post("/API_URL/users", this.data()).subscribe(() => {
      this.#toast.showToast("Başarılı" , "Kaydınız başarıyla tamamlandı giriş yapabilirsiniz")
      this.#router.navigateByUrl("/auth/login")

    });
  }
}
