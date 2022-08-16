import axios from "axios";
import { BASE_URL } from "../Utils";

export function getUserData(cb) {
  axios
    .get(`${BASE_URL}/getUser`)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
}
