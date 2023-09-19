import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  categorieSubscription : Subscription | undefined
  categories : Array<string> | undefined

  constructor(private storeService : StoreService){
    
  }
  

  ngOnInit(): void {
    this.categorieSubscription = this.storeService.getAllCategories()
    .subscribe((_categories)=>{
      this.categories = _categories
    })
  }

  onShowCategory(category :string):void{
    this.showCategory.emit(category)
  }

  ngOnDestroy(): void {
    if(this.categorieSubscription){
      this.categorieSubscription.unsubscribe()
    }
  }
}
