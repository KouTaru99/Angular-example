import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.css'],
  providers: [CategoryService, BookService]
})
export class CateComponent implements OnInit {
  arrCate:any = [];
  arrBook:any = [];

  constructor(private cateService: CategoryService, private bookService: BookService) {
    cateService.getCategory().subscribe(data=> {
      this.arrCate = data;
    });

    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });

  }

  ngOnInit(): void {
  }

}
