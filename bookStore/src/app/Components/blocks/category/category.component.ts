import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  arrCate:any = [];
  abc:string = '';

  @Input() test:string | undefined;

  constructor(private cateService: CategoryService) {


    cateService.getCategory().subscribe(data=> {
      console.log(data);
      this.arrCate = data;
    });
  }

  ngOnInit(): void {
  }

}
