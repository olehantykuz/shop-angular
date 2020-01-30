import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule, PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [BsDropdownModule, PaginationModule]
})
export class AppBootstrapModule { }
