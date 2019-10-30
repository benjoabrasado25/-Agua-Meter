import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomedetailsPage } from '../homedetails/homedetails.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AguameterService } from '../services/aguameter.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

	house_list
	house = {
		name: '',
		location: '',
		balance: 0,
		temperature: '',
		timer: 0,
		timer_status: 0,
		valve: false
	}

	selected_house: string = '' 

	constructor(
		public modal: ModalController,
		public db: AngularFirestore,
		public AGS: AguameterService
		) { }

	ngOnInit() {
		this.AGS.getCurrentUserId().then(userid=>{

			this.db.collection("users").doc(userid["id"]).collection('House').valueChanges().subscribe(data=>{
				this.house_list = data

				if(this.selected_house){
					console.log("test!!@!")
				}
				// console.log(this.house_list)
			})

		})		

	}

	async displayAddHouse(pet_id){
		const myModal = await this.modal.create({
			component: HomedetailsPage,
			componentProps: {}
		})
		await myModal.present()		
	}		


	changeHouse(val){
		this.selected_house = val
		this.AGS.getCurrentUserId().then(userid=>{

			this.db.collection("users").doc(userid["id"]).collection('House').doc(val).valueChanges().subscribe(data=>{

				this.house = data

			})

		})			
	}
}
