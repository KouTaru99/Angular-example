import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService]
})
export class HomeComponent implements OnInit {
  arrBook:any = []

  constructor(private bookService: BookService) {
    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });
   }

  ngOnInit(): void {
  }

}
