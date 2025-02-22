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
  likeId?: string;
}

export interface IBookedHome extends IHome {
  bookId: string;
  from: Date;
  to: Date;
}

export interface IHomeFilters {
  category?: string;
  country?: string;
  guest?: number;
  room?: number;
  bathroom?: number;
}
