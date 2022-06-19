import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/dialog/edit-pokemon/edit-pokemon.component";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-trainer-edit",
	templateUrl: "./trainer-edit.component.html",
	styleUrls: ["./trainer-edit.component.css"],
})
export class TrainerEditComponent implements OnInit {
	editForm: FormGroup;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.mainForm();
		this.setForm(this.data.myobj._id);
	}

	ngOnInit(): void {}

	get myForm() {
		return this.editForm.controls;
	}

	mainForm() {
		this.editForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			Num: [
				"",
				[Validators.required, Validators.pattern("^[0-9]+$")],
			],
			IDnum: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			address: this.formBuilder.group({
				city: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				street: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				house: [
					"",
					[Validators.required, Validators.pattern("^[0-9]+$")],
				],
			}),
		});
	}

	setForm(id) {
		this.apiService.getTrainer(id).subscribe((data) => {
			this.editForm.setValue({
				name: data["name"],
				phoneNum: data["phoneNum"],
				IDnum: data["IDnum"],
				address: data["address"],
			});
		});
	}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.apiService
				.updateTrainer(this.data.myobj._id, this.editForm.value)
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