import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { AguameterService } from '../services/aguameter.service'
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.page.html',
  styleUrls: ['./homedetails.page.scss'],
})
export class HomedetailsPage implements OnInit {
	
	loading: any
	form: FormGroup	

	constructor(
		public modal: ModalController,
		private frmBuilder: FormBuilder,
		public loadingctrl: LoadingController,
		public AGS: AguameterService
		) {
		this.form = this.frmBuilder.group({
			name: ['', Validators.required],
			location: ['', Validators.required]
		})		
	}

	ngOnInit() {
	}

	async addHouse(){
		this.loading = await this.loadingctrl.create({
			message: "Adding house..."
		})
		this.loading.present();
		this.AGS.getCurrentUserId().then(userid=>{
			let add_house = this.AGS.createHouse({
				name: this.form.get('name').value,
				location: this.form.get('location').value,
				timer: 0,
				timer_status: false,
				valve: false,
				temperature: '13.4 *C'
			}, userid)

			if(add_house){
				this.loading.dismiss()
				alert("House Added!")
				this.modal.dismiss()
			}
		})
	}



}
