import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { AguameterService } from '../services/aguameter.service'
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	loading: any
	form: FormGroup	

	constructor(
		private frmBuilder: FormBuilder,
		public AGS: AguameterService,
		public loadingctrl: LoadingController,
		public router: Router,
		public ionstorage: Storage
		) {

		this.form = this.frmBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
			password: ['', Validators.required]
		})	
			
	}

	ngOnInit() {
	}

	async signin(){
		this.loading = await this.loadingctrl.create({
			message: "Sign in..."
		})

		this.loading.present();

		this.AGS.login(this.form.get('email').value, this.form.get('password').value).then(
			(result)=>{
				this.AGS.checkIfLoggedIn(result.user["uid"]).then(data=>{
					this.ionstorage.set('user_id', data);
					this.router.navigate(['/dashboard'])
				})
				this.loading.dismiss();
			},
			(error)=>{
				this.loading.dismiss();
				alert(error.message)
			}
		)

	}	

}
