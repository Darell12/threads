import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  isExpand = false;
  
  toggleExpanded () {
   this.isExpand = !this.isExpand; 
   console.log(this.isExpand);
  }
}
