import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCategoryPopOverPage } from './item-category-pop-over';

@NgModule({
  declarations: [
    ItemCategoryPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCategoryPopOverPage),
  ],
  exports: [
    ItemCategoryPopOverPage
  ]
})
export class ItemCategoryPopOverPageModule {}
