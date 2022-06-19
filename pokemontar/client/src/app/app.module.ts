import { LayoutModule } from "@angular/cdk/layout";
import { HttpTrainerModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import {
	MatDialogModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TrainerCreateComponent } from "./components/trainer-create/trainer-create.component";
import { TrainerEditComponent } from "./components/trainer-edit/trainer-edit.component";
import { TrainerListComponent } from "./components/trainer-list/trainer-list.component";
import { TournamentCreateComponent } from "./components/tournament-create/tournament-create.component";
import { TournamentListComponent } from "./components/tournament-list/tournament-list.component";
import { PokemonAddComponent } from "./components/pokemon-add/pokemon-add.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { DeletePokemonComponent } from "./dialog/delete-pokemon/delete-pokemon.component";
import { EditPokemonComponent } from "./dialog/edit-pokemon/edit-pokemon.component";
import { MaterialModule } from "./material.module";
import { ApiService } from "./service/api.service";
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		TrainerListComponent,
		TrainerCreateComponent,
		TrainerEditComponent,
		PokemonAddComponent,
		PokemonListComponent,
		TournamentCreateComponent,
		TournamentListComponent,
		DeletePokemonComponent,
		EditPokemonComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpTrainerModule,
		BrowserAnimationsModule,
		LayoutModule,
		MaterialModule,
		ReactiveFormsModule,
		MatDialogModule,
		FlexLayoutModule,
	],
	providers: [
		ApiService,
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
