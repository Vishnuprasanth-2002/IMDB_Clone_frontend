export interface IUserAdd {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  user_password?: string;
  phone_no: string;
}
export interface Ilogin {
  email: string;
  user_password: string;
}
export interface IMovie {
  movie_id?: string;
  movie_name: string;
  image: string;
  movie_desc: string;
  release_year: number | undefined;
  rating?: number;
}
export interface IRating {
  rating: number;
}
export interface IResetPass {
  old_password?: string;
  new_password: string;
}
export interface Iemail {
  email: string;
}
export interface Iotp {
  otp: number;
}
// export interface IMoviedata {
//   movie_id: string;
//   movie_name: string;
//   image: string;
//   movie_desc: string;
//   addedBy: string;
//   overallRating: number;
//   ratings?: { rating: number; ratedBy: string }[];
// }
