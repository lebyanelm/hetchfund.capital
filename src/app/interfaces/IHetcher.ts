export interface IHetcher {
  _id: string;
  display_name: string;
  email_address: string;

  eggs: string[];
  eggs_funded: number[];
  eggs_archived: string[];
  eggs_bookmarked: string[];

  home_city: string;
  nationality: string;
  gender: number;
  age: string;
  occupation: string;
  interests: string[];
  external_links: string[];

  comments: string[];
  recent_searches: string;
  followers: string[];
  follows: string[];
  previous_usernames: string[];

  payment_methods: string[];
  payments: string[];

  notifications: string[];
  preferences: any; // TODO: Make a IPreferences
}
