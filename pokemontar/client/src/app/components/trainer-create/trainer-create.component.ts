import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-trainer-create",
	templateUrl: "./trainer-create.component.html",
	styleUrls: ["./trainer-create.component.css"],
})
export class TrainerCreateComponent implements OnInit {
	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

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

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			console.log(
				"TrainerCreateComponent -> this.createForm.value",
				this.createForm.value
			);
			this.apiService.createTrainer(this.createForm.value).subscribe(
				() => {
					console.log("Trainer successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}