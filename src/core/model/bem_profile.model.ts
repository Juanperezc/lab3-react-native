import { ImageSource } from '@src/assets/images';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface BemProfile {
  _id: string,
  email: string;
  full_name: string;
  photo: string;
  date_birth: Date | string;
  phone: string;
  city: string;
  alias: string;
  rol: string;
  followers: BemProfile[];
  following: BemProfile[];
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
