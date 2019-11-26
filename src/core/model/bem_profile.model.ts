import { ImageSource } from '@src/assets/images';
import { BemArticle } from './bem_article.model';
import { BemFollow } from './bem_follow.model';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface BemProfile {
  _id: string,
  email: string;
  full_name: string;
  photo: string;
  birth_date: Date | string;
  phone: string;
  city: string;
  country: string;
  alias: string;
  rol: string;
  publications: BemArticle[];
  followers: BemFollow[];
  following: BemFollow[];
 // threads:
 // notifications :
  //friends: BemProfile[];
 // onLine?: boolean;
}

export interface ProfileSocials {
  followers: number;
  following: number;
  posts: number;
}

export interface CategorisedProfileActivity {
  [category: string]: ProfileActivity[];
}

export interface ProfileActivity {
  category: string;
  source: ImageSource;
}
