export interface IEgg {
  _id?: string;
  key?: string;

  curator?: {
    name: string;
    username: string;
  };
  other_curators?: string;
  name?: string;

  ending_timestamp?: number;
  funding_until?: number;

  is_none_end?: boolean;
  is_hetch_favourite?: boolean;
  is_approved?: boolean;
  is_funded?: boolean;

  hetching_goal?: number;
  hetched_funds?: number;
  hetched_funds_perc?: number;
  funds_left?: number;
  funds_left_perc?: number;

  short_description?: string;
  stages?: any[];
  story?: string;
  presentation_video?: string;
  thumbnail_url?: string;
  primary_category?: string;
  secondary_category?: string;
  updates?: any[];
  comments?: any[];
  risks?: any[];
  external_links?: any[];
  faqs?: any[];
  bookmarks?: any[];
  funding_purpose?: string;
  tags?: string[];
}
