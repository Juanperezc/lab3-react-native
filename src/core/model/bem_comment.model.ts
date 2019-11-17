import { Profile } from './profile.model';
import { BemProfile } from './bem_profile.model';

export interface BemComment {
  author: BemProfile;
  body: string;
  likes: [];
  date: string;
  create_at: string;
  updated_at: string;
  /* comments?: BemComment[]; */
}
