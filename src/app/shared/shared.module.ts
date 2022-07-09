import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
    declarations:[
        AlertComponent,
    LoadingComponent,
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,
    LoadingComponent,
    ]
})

export class SharedModule{

}