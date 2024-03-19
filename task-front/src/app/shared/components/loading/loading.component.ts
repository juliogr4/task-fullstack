import { Component, inject } from '@angular/core';
import { GlobalLoaderService } from '../../service/global-loader.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  loaderService = inject(GlobalLoaderService);
  isLoading$ = this.loaderService.loadingAction$;
}
