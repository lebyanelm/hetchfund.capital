export interface IHetcher {
  _id?: string;
  display_name?: string;
  email_address?: string;
  profile_image?: string;
  username?: string;

  eggs?: string[];
  eggs_funded?: number[];
  eggs_archived?: string[];
  eggs_bookmarked?: string[];
  recently_viewed?: string[];

  home_city?: string;
  nationality?: string;
  gender?: string;
  age?: string;
  occupation?: string;
  interests?: string[];
  external_links?: string[];
  biography?: string;

  comments?: string[];
  recent_searches?: string;
  followers?: string[];
  follows?: string[];
  previous_usernames?: string[];

  payment_methods?: string[];
  payments?: string[];

  notifications?: string[];
  preferences?: any; // TODO: Make a IPreferences

  media_files?: any[]; // TODO: make IMediaFile

  is_collective: boolean;
}
