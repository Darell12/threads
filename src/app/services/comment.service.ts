import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { enviroment } from '../enviroment';

type CreateCommentDto = {
  text: string;

  userId: string;

  parentId?: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${enviroment.apiBaseUrl}comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(`${enviroment.apiBaseUrl}comments`, comment);
  }
}
