import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomepageComponent } from './homepage/homepage.component';
import { YourpostsComponent } from './yourposts/yourposts.component';
import { NewpostComponent } from './newpost/newpost.component';
import * as $ from 'jquery';
import { ViewthreadComponent } from './viewthread/viewthread.component';
import { DummyComponent } from './dummy/dummy.component';
import { FriendHandlerComponent } from './friend-handler/friend-handler.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';
import { FilterpostsComponent } from './filterposts/filterposts.component';
import { FriendsComponent } from './friends/friends.component';
import { NavchatComponent } from './navchat/navchat.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginsignupComponent,
    NavbarComponent,
    WelcomeComponent,
    HomepageComponent,
    YourpostsComponent,
    NewpostComponent,
    ViewthreadComponent,
    DummyComponent,
    FriendHandlerComponent,
    NotificationsComponent,
    CategoriesComponent,
    ContributorsComponent,
    UserComponent,
    ChatComponent,
    SearchComponent,
    FilterpostsComponent,
    FriendsComponent,
    NavchatComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
