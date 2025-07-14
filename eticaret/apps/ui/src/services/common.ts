import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BasketModel } from '@shared/models/basket.model';
import { UserModel } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);
  readonly basketCount = signal<number>(0);

  readonly #http = inject(HttpClient)
  constructor(){
    const response: string | null = localStorage.getItem("response");
    if(response){
      this.user.set(JSON.parse(response));
      this.getBasketCount();
    }
  }

  getBasketCount(){
    if(this.user()){
      const endpoind = `/API_URL/baskets?userId=${this.user()!.id}`
      this.#http.get<BasketModel[]>(endpoind).subscribe(res => this.basketCount.set(res.length));
    }
  }

  setUser(user: UserModel){
    this.user.set(user);
    this.getBasketCount();
  }


}
