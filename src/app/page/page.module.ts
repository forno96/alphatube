import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { VideopageModule } from './videopage/videopage.module';
import { SearchModule } from './search/search.module';
import { AboutModule } from './about/about.module';
import { Page404Module } from './page404/page404.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    VideopageModule,
    SearchModule,
    AboutModule,
    Page404Module
  ]
})
export class PageModule { }
