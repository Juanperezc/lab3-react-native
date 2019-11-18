import { BemProfile } from './bem_profile.model';

export interface BemArticleLike {
  _id: string;
  author: BemProfile;
  create_at: Date | string;
  updated_at: Date | string;
 /*  comments?: Comment[]; */
}
