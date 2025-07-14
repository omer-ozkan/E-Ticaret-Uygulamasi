import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { httpResource } from '@angular/common/http';
import { OrderModel } from '@shared/models/order.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    DatePipe,
    TrCurrencyPipe,
    CommonModule
  ],

  templateUrl: './orders.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Orders {
  readonly limit = signal<number>(4);
  readonly totalCount= signal<number>(16);
  readonly waitingCount= signal<number>(3);
  readonly completedCount= signal<number>(13);
  readonly result = httpResource<OrderModel[]>(() => {
      const endpoint =  `/API_URL/orders?userId=${this.#common.user()?.id}&_limit=${this.limit()}`;
      return endpoint;
    });
    readonly data = computed(() => this.result.value() ?? []);
    readonly total = computed(() => {
      let total = 0;
      this.data().forEach((val: OrderModel) => {
        val.baskets.forEach((d: any) => total += (d.productPrice * d.quantity)* 18/100)
      });

      return total;
    })


  readonly #common = inject(Common);

  showMore(){
    this.limit.update(prev => prev + 4);
    }
  }