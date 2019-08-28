import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ShowDataComponent } from './show-data/show-data.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CatComponent } from './cat/cat.component';
import { AuthComponent } from './auth/auth.component';
// import { HomeComponent } from './home/home.component';
import { AuthGuard } from './app.guard';
import { CatsComponent } from './cats/cats.component';
import { UnAuthGuard } from './app.unauth.guard';
import { RegisterComponent } from './register/register.component';
// import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './shared';

const appRoutes: Routes = [
    // { path: "", component: ShowDataComponent },
    // { path: "", redirectTo: '/home', pathMatch: 'full' },
    { path: "", component: CatsComponent, canActivate: [AuthGuard] },
    { path: "cat/:id", component: CatComponent, canActivate: [AuthGuard] },
    { path: "login", component: AuthComponent, canActivate: [UnAuthGuard] },
    { path: "register", component: RegisterComponent, canActivate: [UnAuthGuard]},
    // { path: "", redirectTo: '/home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    { path:"**", component: PagenotfoundComponent, redirectTo: '' },
    
    // { path: '', redirectTo: '/home' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}
