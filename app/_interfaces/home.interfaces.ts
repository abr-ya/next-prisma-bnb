interface IFavourite {
  id: string;
  userId: string | null;
  homeId: string | null;
  createAt: Date;
}

export interface IHome {
  id: string;
  title: string;
  description: string;
  country: string;
  imageSrc: string | null;
  price: number;
  Favorite: Array<IFavourite>;
}

export interface IHomeFilters {
  filter?: string;
  country?: string;
  guest?: number;
  room?: number;
  bathroom?: number;
}
