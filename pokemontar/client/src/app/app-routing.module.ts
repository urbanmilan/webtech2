import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainerCreateComponent } from "./components/trainer-create/trainer-create.component";
import { TrainerEditComponent } from "./components/trainer-edit/trainer-edit.component";
import { TrainerListComponent } from "./components/trainer-list/trainer-list.component";
import { LoginComponent } from "./components/login/login.component";
import { TournamentCreateComponent } from "./components/tournament-create/tournament-create.component";
import { TournamentListComponent } from "./components/tournament-list/tournament-list.component";
import { PokemonAddComponent } from "./components/pokemon-add/pokemon-add.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";

const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "login" },
	{ path: "trainer-list", component: TrainerListComponent },
	{ path: "trainer-create", component: TrainerCreateComponent },
	{ path: "trainer-edit/:id", component: TrainerEditComponent },
	{ path: "pokemon-list", component: PokemonListComponent },
	{ path: "pokemon-add", component: PokemonAddComponent },
	{ path: "tournament-create", component: TournamentCreateComponent },
	{ path: "tournament-list", component: TournamentListComponent },
	{ path: "login", component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
