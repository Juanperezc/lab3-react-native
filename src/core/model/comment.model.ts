import { Profile } from './profile.model';
import { BemProfile } from './bem_profile.model';

export interface Comment {
  author: BemProfile;
  body: string;
  likes: [];
  likesCount: number;
  date: string;
  create_at: string;
  updated_at: string;
  comments?: Comment[];
}
