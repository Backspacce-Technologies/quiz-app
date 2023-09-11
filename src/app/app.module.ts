import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './post-auth/sidebar/sidebar.component';
import { StartQuizComponent } from './post-auth/start-quiz/start-quiz.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './post-auth/post-auth.module';



@NgModule({
	declarations: [
		AppComponent,
  StartQuizComponent,
		

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
