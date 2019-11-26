import { BemProfile } from "./bem_profile.model";

export interface BemFollow {
  _id: string;
  user_id: string;
  user: BemProfile;
  follower_id: string;

  create_at: Date | string;
  updated_at: Date | string;

}
