import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeletePokemonComponent } from "src/app/dialog/delete-pokemon/delete-pokemon.component";
import { EditPokemonComponent } from "src/app/dialog/edit-pokemon/edit-pokemon.component";
import { ApiService } from "src/app/service/api.service";
import { PokemonAddComponent } from "../pokemon-add/pokemon-add.component";

@Component({
	selector: "app-pokemon-list",
	templateUrl: "./pokemon-list.component.html",
	styleUrls: ["./pokemon-list.component.css"],
})
export class PokemonListComponent implements OnInit {
	Pokemons: any = [];
	imgClass;

	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readPokemons();
	}

	ngOnInit(): void {}

	readPokemons() {
		this.apiService.getPokemons().subscribe((data) => {
			this.Pokemons = data;
		});
	}

	removePokemon(pokemon, index) {
		const dialogRef = this.dialog.open(DeletePokemonComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService
					.deletePokemon(pokemon._id)
					.subscribe((data) => {
						this.Pokemons.splice(index, 1);
					});
			}
		});
	}

	editPokemon(pokemon, index) {
		const dialogRef = this.dialog.open(EditPokemonComponent, {
			data: { myobj: pokemon, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readPokemons();
			}
		});
	}

	createPokemon() {
		const dialogRef = this.dialog.open(PokemonAddComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readPokemons();
			}
		});
	}
}
