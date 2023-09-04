import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TableListComponent } from './table-list/table-list.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
	

	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: '',
				redirectTo:'add-form',
				pathMatch: 'full',
		
			},
			{
				path: 'add-form',
				component: AddFormComponent,
				
				// redirectTo: '/add-form' 
			},
			{
				path: 'table-list',
				component: TableListComponent,
				// redirectTo: '/add-form' 
			},
			{
				path: 'start-quiz',
				component: StartQuizComponent,
			},
			{
				path: 'result/:result',
				component: ResultComponent,
			}
		]
	},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
	// declarations:[],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostAuthRoutingModule { }
