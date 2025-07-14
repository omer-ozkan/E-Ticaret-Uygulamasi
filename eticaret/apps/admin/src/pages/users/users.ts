import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridModule } from 'flexi-grid';
import { FlexiToastService } from 'flexi-toast';
import { RouterModule } from '@angular/router';
import { API_URL } from '../../constants';
import { FormsModule } from '@angular/forms';
import { UserModel} from '@shared/models/user.model'

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Users {

  readonly result = httpResource<UserModel[]>(() => `${API_URL}/users`);
  readonly data = computed(() => {
    const users = this.result.value() ?? [];
    console.log('Users data:', users);
    return users;
  });
  readonly loading = computed(() => this.result.isLoading());
  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id:string){
    this.#toast.showSwal("Kullanıcıyı sil","Kullanıcıyı Silmek İstiyor musunuz","sil", () => {
      this.#http.delete(`${API_URL}/users/${id}`).subscribe(() => {
        this.result.reload();
      })
    })
  }

  changeIsAdmin(data:UserModel){
    this.#http.put(`${API_URL}/users/${data.id}`, data).subscribe(() => {
    this.result.reload();
  });
  }
}
