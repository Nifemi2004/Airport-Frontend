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
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    ButtonComponent,
    NavbarComponent,
    SidebarComponent,
    FormComponent,
    ModalComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MenuModule,
    MessagesModule,
    ToastModule,
  ],
  exports: [
    ButtonComponent,
    NavbarComponent,
    SidebarComponent,
    ModalComponent,
    FormComponent,
    CarouselComponent,
  ],

  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class SharedModule { }
