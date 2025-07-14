import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Blank],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
}
