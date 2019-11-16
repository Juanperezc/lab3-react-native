import { ImageSource } from '@src/assets/images';
import { Comment } from './comment.model';
import { BemProfile } from './bem_profile.model';
/* import { BemProfile } from './profile.model'; */

export interface BemArticle {
  _id : string
  user_id: string;
  title: string;
  body: string;
  photo: string;
  category: string;
  author: BemProfile;
/*   author: Profile; */
  create_at: string;
  updated_at: string;
/*   tips: number; */
  commentaries: [];/* Comment[]; */
  likes: [];/*  number; */
}
