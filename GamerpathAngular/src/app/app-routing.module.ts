import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomepageComponent } from './homepage/homepage.component';
import { YourpostsComponent } from './yourposts/yourposts.component';
import { NewpostComponent } from './newpost/newpost.component';
import { ViewthreadComponent } from './viewthread/viewthread.component';
import { DummyComponent } from './dummy/dummy.component';
import { FriendHandlerComponent } from './friend-handler/friend-handler.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChatComponent } from './chat/chat.component';
import { FilterpostsComponent } from './filterposts/filterposts.component';
import { FriendsComponent } from './friends/friends.component';
import { NavchatComponent } from './navchat/navchat.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path:'', component: WelcomeComponent},
  { path:'homepage', component: HomepageComponent},
  { path:'login', component: LoginsignupComponent},
  { path:'yourposts', component: YourpostsComponent},
  { path:'newpost', component: NewpostComponent},
  { path:'viewthread', component: ViewthreadComponent},
  { path:'dummy', component: DummyComponent},
  { path:'friends', component: FriendHandlerComponent},
  { path:'notifications', component: NotificationsComponent},
  { path:'chat', component: ChatComponent},
  { path:'filterposts', component: FilterpostsComponent},
  { path:'navfriends', component: FriendsComponent},
  { path:'navchat', component: NavchatComponent},
  { path:'admin', component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
