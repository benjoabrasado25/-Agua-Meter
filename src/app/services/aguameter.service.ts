import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage'
import { AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage'

import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AguameterService {

	constructor(
		public db: AngularFirestore,
		public dbAuth: AngularFireAuth,
		public dbStorage: AngularFireStorage,
		public ionstorage: Storage
		) { }

	saveUser(email, password){
		return this.dbAuth.auth.createUserWithEmailAndPassword(email, password)
	}



	createUser(user_id, user_data){
		return this.db.collection("users").doc(user_id).set({
			id: user_id,
			first_name: user_data["fname"],
			last_name: user_data["lname"],
			email: user_data["email"],
			loggedin: false
		})
	}	 

	login(email, password){
		return this.dbAuth.auth.signInWithEmailAndPassword(email, password)
	}	 

	checkIfLoggedIn(id){
		return new Promise((resolve, reject)=>{
			this.db.collection('users').doc(id).valueChanges().subscribe(value=>{
				resolve(value)
			})
		})
	}

	getCurrentUserId(){
		return new Promise((resolve, reject)=>{
		  this.ionstorage.get('user_id').then(data=>{
		    resolve(data)
		  })
		})
	}


}
