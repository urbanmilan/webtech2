import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-tournament-create",
	templateUrl: "./tournament-create.component.html",
	styleUrls: ["./tournament-create.component.css"],
})
export class TournamentCreateComponent implements OnInit {
	createForm: FormGroup;
	Pokemons: any = [];
	addedPokemons: any = [];
	Trainers: any = [];
	selected: any;

	//! tmp
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
		this.readPokemons();
		this.readTrainers();
	}

	get myForm() {
		return this.createForm.controls;
	}

	get firstGroup() {
		return this.firstFormGroup.controls;
	}

	//! tmp oninit
	ngOnInit(): void {
		this.firstFormGroup = this.formBuilder.group({
			tournamentingtrainer: ["", Validators.required],
		});
		this.secondFormGroup = this.formBuilder.group({
			secondCtrl: ["", Validators.required],
		});
	}

	readPokemons() {
		this.apiService.getPokemons().subscribe((data) => {
			this.Pokemons = data;
		});
	}

	readTrainers() {
		this.apiService.getTrainers().subscribe((data) => {
			this.Trainers = data;
		});
		console.log(this.Trainers);
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			dateofTournament: ["", [Validators.required]],
			expiry: ["", [Validators.required]],
			Tournamented: [""],
		});
	}

	addPokemon(pokemon, i) {
		this.Pokemons.splice(i, 1);
		this.addedPokemons.push(pokemon);
		this.createForm.value.Tournamented = this.addedPokemons;
	}

	removePokemon(pokemon, i) {
		this.addedPokemons.splice(i, 1);
		this.Pokemons.push(pokemon);
		this.createForm.value.Tournamented = this.addedPokemons;
	}

	submitForm() {
		if (!this.createForm.valid && this.addedPokemons.length <= 0) {
			return false;
		} else {
			this.apiService.createTournament(this.createForm.value).subscribe(
				(res) => {
					this.addedPokemons.forEach((pokemon) => {
						pokemon.state = "TOURNAMENT";
						console.log(
							"TournamentCreateComponent -> submitForm -> pokemon",
							pokemon
						);
						this.apiService
							.updatePokemon(pokemon._id, pokemon)
							.subscribe(
								() => {
									console.log("Updated!");
								},
								(error) => {
									console.log(error);
								}
							);
					});

					this.selected.Tournaments.push(res);
					this.apiService
						.updateTrainer(this.selected._id, this.selected)
						.subscribe(() => {
							console.log("Trainer updated!");
						});
					console.log("Tournament successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}