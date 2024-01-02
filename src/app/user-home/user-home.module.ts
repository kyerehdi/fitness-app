import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserHomePage } from "./user-home";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        component : UserHomePage
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes),CommonModule, IonicModule],
    declarations: [UserHomePage],

})

export class UserHomePageModule {}