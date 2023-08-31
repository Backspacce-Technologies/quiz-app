import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './post-auth/sidebar/sidebar.component';
import { StartQuizComponent } from './post-auth/start-quiz/start-quiz.component';

@NgModule({
	declarations: [
		AppComponent,
  StartQuizComponent
	 
	],
	imports: [
		BrowserModule,
		AppRoutingModule,

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
