import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

@Component({
	selector: "app-pokemon-add",
	templateUrl: "./pokemon-add.component.html",
	styleUrls: ["./pokemon-add.component.css"],
})
export class PokemonAddComponent implements OnInit {
	submitted = false;

	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

	states: IOptions[] = [
		{ value: "AVAILABLE", viewValue: "Available" },
		{ value: "TOURNAMENT", viewValue: "Tournamented" },
		{ value: "RUINED", viewValue: "Ruined" },
	];

	types: IOptions[] = [
		{ value: "NORMAL", viewValue: "NORMAL" },
		{ value: "CASSETTE", viewValue: "Cassette" },
		{ value: "OTHER", viewValue: "Other" },
	];

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			dateofcatch: ["", [Validators.required]],
			idNUM: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			state: ["", [Validators.required]],
			type: ["", [Validators.required]],
		});
	}

	submitForm() {
		this.submitted = true;
		if (!this.createForm.valid) {
			return false;
		} else {
			this.apiService.createPokemon(this.createForm.value).subscribe(
				(res) => {
					console.log("Pokemon successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}