import axios from "axios";
import { config } from "./config";

export async function getReviews() {
    try {
        const url = `${config.server}/reviews`

        const response = await axios.get(url)
        console.log(response.data);

        return response.data

    } catch (ex) {
        console.log(`exception`, ex);

    }
}

export async function addReview(movie_id, review, rating, user_id) {
    try {
        const url = `${config.server}/reviews/add`

        console.log(movie_id);
        console.log(review);
        console.log(rating);
        console.log(user_id);

        const body = { movie_id, review, rating, user_id }

        const response = await axios.post(url, body)
        console.log(response.data);

        return response.data

    } catch (ex) {
        console.log(`exception`, ex);
        return { status: 'error', error: ex.response?.data?.error || 'Network error' }
    }
}
