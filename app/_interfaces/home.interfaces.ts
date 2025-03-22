interface IFavourite {
  id: string;
  userId: string | null;
  homeId: string | null;
  createAt: Date;
}

export interface IImageData {
  id: string;
  url: string;
  title: string | null;
  userId: string;
  folderId: string | null;
  homeId: string | null;
  createAt: Date;
}

export interface IHome {
  id: string;
  title: string;
  description: string;
  country: string;
  imageSrc: string | null;
  images?: IImageData[];
  price: number;
  Favorite: Array<IFavourite>;
  likeId?: string;
}

export interface IBookedHome extends IHome {
  bookId: string;
  from: Date;
  to: Date;
}

export interface IHomeUpdateData {
  title?: string;
  description?: string;
  pinLat?: number;
  pinLon?: number;
}

export interface IHomeFilters {
  category?: string;
  country?: string;
  guest?: string;
  room?: string;
  bathroom?: string;
}
