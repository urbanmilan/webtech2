import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

export interface DialogData {
	myobj: any;
	id: number;
}

@Component({
	selector: "app-edit-pokemon",
	templateUrl: "./edit-pokemon.component.html",
	styleUrls: ["./edit-pokemon.component.css"],
})
export class EditPokemonComponent implements OnInit {
	editForm: FormGroup;

	matcher = new FormErrorMatcherService();

	states: IOptions[] = [
		{ value: "AVAILABLE", viewValue: "Available" },
		{ value: "KNOCK_OUT", viewValue: "Knock Out" },
	];

	types: IOptions[] = [
		{ value: "NORMAL", viewValue: "NORMAL" },
		{ value: "GROUND", viewValue: "Ground" },
		{ value: "FIRE", viewValue: "Fire" },
		{ value: "ICE", viewValue: "Ice" },
		{ value: "ELECTRIC", viewValue: "Electric" },
		{ value: "FIGHTING", viewValue: "Fighting" },
	];

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.setForm(this.data.myobj._id);
		this.mainForm();
	}

	ngOnInit(): void {}

	get myForm() {
		return this.editForm.controls;
	}

	mainForm() {
		this.editForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			dateofCatch: ["", [Validators.required]],
			poke_ID: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			state: ["", [Validators.required]],
			type: ["", [Validators.required]],
		});
	}

	setForm(id) {
		this.apiService.getPokemon(id).subscribe((data) => {
			this.editForm.setValue({
				name: data["name"],
				dateofCatch: data["dateofCatch"],
				poke_ID: data["poke_ID"],
				state: data["state"],
				type: data["type"],
			});
		});
	}

	onSubmit() {}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.apiService
				.updatePokemon(this.data.myobj._id, this.editForm.value)
				.subscribe(
					(res) => {
						console.log("Content updated successfully!");
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}
}
