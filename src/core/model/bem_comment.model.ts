import { Profile } from './profile.model';
import { BemProfile } from './bem_profile.model';
import { BemCommentaryLike } from './bem_commentary_like.model';

export interface BemComment {
  _id: string;
  author: BemProfile;
  body: string;
  likes: BemCommentaryLike[];
  create_at: string;
  updated_at: string;
  /* comments?: BemComment[]; */
}
