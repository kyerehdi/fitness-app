import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { SignUpPage } from "./sign-up/sign-up.page";
import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { FirstOnboardingPage } from "./onboarding-one/onboarding.one.page";


@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        IonicModule,
        OnboardingRoutingModule
    ],
    declarations:[
        SignUpPage,
        FirstOnboardingPage
    ]
})

export class OnboardingModule {}