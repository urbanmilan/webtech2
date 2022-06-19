import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { TrainerCreateComponent } from "../trainer-create/trainer-create.component";
import { TrainerEditComponent } from "../trainer-edit/trainer-edit.component";

@Component({
	selector: "app-trainer-list",
	templateUrl: "./trainer-list.component.html",
	styleUrls: ["./trainer-list.component.css"],
})
export class TrainerListComponent implements OnInit {
	Trainers: any = [];
	panelOpenState = false;
	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.readTrainers();
	}

	readTrainers() {
		this.apiService.getTrainers().subscribe((data) => {
			this.Trainers = data;
			console.log(this.Trainers);
		});
	}

	createTrainer() {
		const dialogRef = this.dialog.open(TrainerCreateComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readTrainers();
				console.log(this.Trainers);
			}
		});
	}

	toggleTrainer(trainer) {
		trainer.isDeleted = !trainer.isDeleted;
		this.apiService.updateTrainer(trainer._id, trainer).subscribe(
			(res) => {
				console.log(res + "Trainer deleted successfully!");
			},
			(error) => {
				console.log(error);
			}
		);
	}
	editTrainer(trainer) {
		const dialogRef = this.dialog.open(TrainerEditComponent, {
			data: { myobj: trainer, index: trainer._id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readTrainers();
			}
		});
	}
}
