import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addReview } from '../../services/reviews'
import { useAuth } from '../providers/AuthProvider'
import { toast } from 'react-toastify'

function AddReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(1)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('User not authenticated')
      return
    }
    if (!review.trim()) {
      toast.error('Review cannot be empty')
      return
    }
    const result = await addReview(id, review, rating, user.uid)
    if (result.status === 'success') {
      toast.success('Review added successfully')
      navigate('/home')
    } else {
      toast.error(result.error || 'Failed to add review')
    }
  }

  return (
    <div className="container">
        <h2 className="page-header">ADD Review</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <select
              className="form-control"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="review" className="form-label">Review</label>
            <textarea
              className="form-control"
              id="review"
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
    </div>
  )
}

export default AddReview
