import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  params: NavParams;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProfilePage;

  constructor(public navParams: NavParams) {
    this.params = navParams;
    console.log("NavParams UID", this.params)
  }
}
