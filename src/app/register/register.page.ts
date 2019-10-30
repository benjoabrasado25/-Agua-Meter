import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { AguameterService } from '../services/aguameter.service'
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
	loading: any
	form: FormGroup	
	error_msg

	constructor(
		private frmBuilder: FormBuilder,
		public AGS: AguameterService,
		public loadingctrl: LoadingController,
		public router: Router
		) {

		this.form = this.frmBuilder.group({
			fname: ['', Validators.required],
			lname: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
			password: ['', Validators.required],
			cpassword: ['', Validators.required],
		})		
	}

	ngOnInit() {
	}

	async signup(){

		this.loading = await this.loadingctrl.create({
			message: "Please wait..."
		})
		// const { fname, lname, email, password, cpassword } = this

		this.loading.present();

		if(this.form.value["password"] !== this.form.value["cpassword"]){
			this.loading.dismiss();
			alert("password didn't match!")
		}
		else if(!this.validateEmail(this.form.value["email"])){
			this.loading.dismiss();
			alert("invalid email!")
		}
		else{
			this.AGS.saveUser(this.form.get('email').value, this.form.get('password').value).then(
			(response)=>{
				this.loading.dismiss();
				this.AGS.createUser(response.user["uid"], this.form.value)
				this.router.navigate(['/login'])
			},
			(error)=>{
				this.loading.dismiss();
				alert(error.message)
			})
		}


	}

	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}		

}
