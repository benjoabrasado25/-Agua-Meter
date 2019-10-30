import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomedetailsPage } from './homedetails.page';

import {Validators, FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomedetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [HomedetailsPage],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]   
})
export class HomedetailsPageModule {}
