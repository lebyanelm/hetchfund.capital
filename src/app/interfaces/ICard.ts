export interface ICard {
  _id?: string | number;
  holder?: string;
  number?: string;
  uid?: string;
  cvv?: string;
  exp_year?: string;
  exp_month?: string;
  payment_brand?: string;
  related_payments?: string[];
  is_default?: boolean;
  amount?: number;
}
