import axios from "axios";
import {
  IMovie,
  IRating,
  IResetPass,
  IUserAdd,
  Iemail,
  Ilogin,
  Iotp,
} from "../components/types";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/",
  //   timeout: 1000,
});
const setHeaders = () => {
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    let decodedToken = jwtDecode(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp && decodedToken.exp < currentDate.getTime() / 1000) {
      console.log("Token expired.");
      localStorage.clear();
      location.reload();
    } else {
      headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return headers;
    }
  }
};
// const axiosInstancewithheader = axios.create({
//   baseURL: "http://localhost:5001",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

export const getMovies = (
  page: number,
  search: string,
  selectedOption: string
) => {
  return axiosInstance.get(
    `/movies?page=${page}&search=${search}&movie_name=${selectedOption}`
  );
};
export const getUser = () => {
  return axiosInstance.get("/u", setHeaders());
};
export const AddMovie = (payload: IMovie) => {
  return axiosInstance.post("/movie", payload, setHeaders());
};
export const addRating = (id: string, payload: IRating) => {
  return axiosInstance.post(`/movie/rating/${id}`, payload, setHeaders());
};
export const getMovie = (movie_id: string) => {
  return axiosInstance.get(`/movies/${movie_id}`, setHeaders());
};
export const updateMovieApi = (movie_id: string, payload: IMovie) => {
  return axiosInstance.patch(`/movies/${movie_id}`, payload, setHeaders());
};
export const updateUser = (payload: IUserAdd) => {
  return axiosInstance.patch("/update", payload, setHeaders());
};
export const updateUserPassword = (payload: IResetPass) => {
  return axiosInstance.put("/u/update/password", payload, setHeaders());
};
export const forgetPasswordApi = (payload: Iemail) => {
  return axiosInstance.post("/forget/password", payload);
};
export const setNewPassword = (payload: IResetPass, id: string) => {
  return axiosInstance.patch(`/update/new/password/${id}`, payload);
};
export const otpVerificationApi = (payload: Iotp, id: string) => {
  return axiosInstance.post(`/otp/verify/${id}`, payload);
};
export const deleteMovieApi = (movieId: string) => {
  return axiosInstance.delete(`/movie/${movieId}`, setHeaders());
};
export const addUser = (payload: IUserAdd) => {
  return axiosInstance.post("/signup", payload);
};
export const loginUser = (payload: Ilogin) => {
  return axiosInstance.post("/login", payload);
};

// export const updateMovie = (payload: IMovieAdd, movieId: number) => {
//   return axiosInstance.put(`/movies/${movieId}`, payload);
// };

// export const deleteMovie = (movieId: number) => {
//   return axiosInstance.delete(`/movies/${movieId}`);
// };
