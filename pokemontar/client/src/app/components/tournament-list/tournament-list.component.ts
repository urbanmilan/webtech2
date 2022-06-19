import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ApiService } from "src/app/service/api.service";
import { TournamentCreateComponent } from "../tournament-create/tournament-create.component";

@Component({
	selector: "app-tournament-list",
	templateUrl: "./tournament-list.component.html",
	styleUrls: ["./tournament-list.component.css"],
})
export class TournamentListComponent implements OnInit {
	Tournaments: any = [];
	Pokemons: any = [];
	availableCount: number = 0;
	constructor(
		private apiService: ApiService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.readTournaments();
		this.readAvailables();
	}

	ngOnInit(): void {}

	readAvailables() {
		this.apiService.getPokemons().subscribe((data) => {
			this.Pokemons = data;
		});

		this.Pokemons.forEach((pokemon) => {
			if (pokemon.state == "AVAILABLE") {
				this.availableCount++;
			}
		});
		console.log(this.Pokemons);
	}

	readTournaments() {
		this.apiService.getTournaments().subscribe((data) => {
			this.Tournaments = data;
		});
	}

	createTournament() {
		this.readAvailables();
		if (this.availableCount > 0) {
			const dialogRef = this.dialog.open(TournamentCreateComponent);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.readTournaments();
				}
			});
		} else {
			const config = new MatSnackBarConfig();
			config.duration = 1000;
			config.panelClass = ["warn-snackbar"];
			this.snackBar.open(
				"There is nothing to tournament!",
				this.availableCount.toString(),
				config
			);
		}
	}
}
