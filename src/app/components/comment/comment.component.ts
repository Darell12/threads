import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpand = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  userService = inject(UserService);
  nestedComment = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpand()) {
      this.commentService
        .getComments(this.comment._id)
        .subscribe((comments) => this.nestedComment.set(comments));
    }
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpand.set(true);
    }
  }

  toggleExpanded() {
    this.isExpand.set(!this.isExpand());
    console.log(this.isExpand());
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();

    if (!user) {
      return;
    }

    this.commentService
      .createComment({
        text,
        userId: user._id,
        parentId: this.comment._id,
      })
      .subscribe((createdComment) => {
        this.nestedComment.set([createdComment, ...this.nestedComment()]);
      });
  }

  commentTrackBy(index: number, comment: Comment) {
    return comment._id;
  }
}
