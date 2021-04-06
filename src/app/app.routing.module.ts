import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { AuthGuard } from './auth.guard';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';


const routes:Routes=[
    {path:'',component:HomeComponent},
    {path:'user/:id',component:UserComponent},
    {path:'userlist',component:UserListComponent, canActivate: [AuthGuard]},
    {path:'catalogue',component:CatalogueComponent},
    {path:'info',component:InfoComponent},
    {path:'card/:id',component:CardDetailsComponent},
    {path: 'login', component:LoginComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes, {useHash: true})],
    exports:[RouterModule]
})
export class AppRoutingModule{

}