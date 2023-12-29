import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ButtonComponent,
    NavbarComponent,
    SidebarComponent,
    FormComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    NavbarComponent,
    SidebarComponent,
    ModalComponent,
    FormComponent
  ],

  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class SharedModule { }
