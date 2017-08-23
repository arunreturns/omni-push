import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  params: NavParams;
  tab1Root = HomePage;
  tab2Root = SettingsPage;

  constructor(public navParams: NavParams) {
    this.params = navParams;
    console.log("NavParams UID", this.params)
  }
}
