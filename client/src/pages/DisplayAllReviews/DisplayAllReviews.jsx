import React, { useState, useEffect } from 'react'
import { getReviews } from '../../services/reviews'

function DisplayAllReviews() {
    const [reviews, setReviews] = useState([])

    const getReviewsList = async () => {
        const response = await getReviews();

        console.log(response);

        if(response.status == 'success'){
            setReviews(response.data);
        }

    }

    useEffect(() =>{
        getReviewsList();
    },[])


  return (
    <div className="container">
        <h2 className="page-header">
            All Reviews
        </h2>

        <div className="reviews-container">
            <table className='table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Movie ID</th>
                <th>User ID</th>
            </tr>

        </thead>
        <tbody>
            {reviews.map((review)=>{
              return(
                <tr key={review['id']}>
                  <td>{review['id']}</td>
                  <td>{review['review']}</td>
                  <td>{review['rating']}</td>
                  <td>{review['movie_id']}</td>
                  <td>{review['user_id']}</td>
                </tr>
              )
            })}
        </tbody>
    </table>
        </div>
    </div>
  )
}

export default DisplayAllReviews
