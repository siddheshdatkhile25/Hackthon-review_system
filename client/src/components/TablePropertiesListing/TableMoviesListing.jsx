import React from 'react'

function TableMoviesListing({movies}) {
  return (
    <table className='table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Released Date</th>
                <th>Actions</th>
            </tr>

        </thead>
        <tbody>
            {movies.map((movie)=>{
              return(
                <tr key={movie['id']}>
                  <td>{movie['id']}</td>
                  <td>{movie['title']}</td>
                  <td>{new Date(movie['release_date']).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                  <td>
                    <button
                    onClick={()=>{
                      addReview(movie['id'])
                    }}
                    className='btn btn-info btn-sm'
                    >
                      Add Review
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
    </table>
  )
}

export default TableMoviesListing