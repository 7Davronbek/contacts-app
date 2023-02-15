export interface ITags {
  id: number;
  name: string;
}

export interface IContacts {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  tag: ITags[];
}
