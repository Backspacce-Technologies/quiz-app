import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthRoutingModule } from './post-auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { HomeComponent } from './home/home.component';
import { TableListComponent } from './table-list/table-list.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
	declarations: [
		HomeComponent,
		AddFormComponent,
		TableListComponent,
		HeaderComponent,
		SidebarComponent

	],
	imports: [
		CommonModule,
		PostAuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,


	]
})
export class PostAuthModule { }
