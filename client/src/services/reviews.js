import axios from "axios";
import { config } from "./config";

export async function addReview(movie_id, review, rating, user_id) {
    try {
        const url = `${config.server}/reviews/add`

        const body = { movie_id, review, rating, user_id }

        const response = await axios.post(url, body)
        console.log(response.data);

        return response.data

    } catch (ex) {
        console.log(`exception`, ex);
    }
}
