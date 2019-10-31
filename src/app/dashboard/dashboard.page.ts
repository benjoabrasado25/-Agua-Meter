import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomedetailsPage } from '../homedetails/homedetails.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AguameterService } from '../services/aguameter.service'
import * as firebase from 'firebase/app'


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

	volume: string = ''

	valve: string = 'OFF'
	selected_house: string = '' 
	volume_limit: string = '0'

	agua = []
	ref = firebase.database().ref('agua/');

	constructor(
		public modal: ModalController,
		public db: AngularFirestore,
		public AGS: AguameterService
		) {
		this.ref.on('value', resp=>{

			this.agua = []

			resp.forEach(doc=>{
				let itemVal = doc.val()
				this.agua.push(itemVal)
			})



			this.valve = this.agua[0]
			this.volume = this.agua[2].split("\\")[0]+"\""
			console.log(this.volume)
		})

		// console.log("--------",this.ref.toJSON())
	}

	setVolumeLimit(){
		// console.log("\""+this.volume_limit+"\"")
		firebase.database().ref('agua/').update({"Set Volume": "\""+this.volume_limit+"\""})
		alert("Volume set!")
	}

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
		this.resetAgua()
	}

	resetAgua(){
		firebase.database().ref('agua/').update({"DeviceStatus": "\"OFF\""})		
		firebase.database().ref('agua/').update({"Set Volume": "\"0\""})		
		firebase.database().ref('agua/').update({"WaterVolume": "\"0\\r\\n\""})	

		this.volume_limit = "0"
	}

	async displayAddHouse(pet_id){
		const myModal = await this.modal.create({
			component: HomedetailsPage,
			componentProps: {}
		})
		await myModal.present()		
	}		

	ToggleSwitch(){
		if(this.agua[0] === "\"OFF\""){
			firebase.database().ref('agua/').update({DeviceStatus: "\"ON\""})
		}
		else{
			firebase.database().ref('agua/').update({DeviceStatus: "\"OFF\""})
		}	

		// firebase.database().ref('agua/').update({DeviceStatus: "\"OFF\""})
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
