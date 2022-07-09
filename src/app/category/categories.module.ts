import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryComponent } from "./category.component";


@NgModule({
    declarations: [
        CategoryComponent,
        CategoryCreateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
        ])
    ],
    exports:[
        CategoryComponent,
        CategoryCreateComponent,
    ]
})

export class CategoriesModule {

}