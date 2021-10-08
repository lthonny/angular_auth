import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from "../services/auth.interceptor";

import {QuillModule} from "ngx-quill";

import {AuthGuard} from "../services/auth.guard";

import {BoardService} from "../services/board.service";
import { BoardsComponent } from './boards/boards.component';
import {TaskService} from "../services/task.service";
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    LoginComponent,
    RegComponent,
    DashboardPageComponent,

    BoardsComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),

    RouterModule.forChild([
      {
        path: '', component: PrivateLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'reg', component: RegComponent },
          { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
          { path: 'boards/:id', component: DashboardPageComponent, canActivate: [AuthGuard] }
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    QuillModule
  ],
  providers: [
    BoardService,
    TaskService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ]
})
export class PrivateModule {}
