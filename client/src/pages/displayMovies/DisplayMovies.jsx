import React from 'react'
import TableMoviesListing from '../../components/TablePropertiesListing/TableMoviesListing'
import {getMovies} from '../../services/movies'
import { useState } from 'react'
import { useEffect } from 'react'

function DisplayMovies() {
    const [movies, setMovies] = useState([])

    const getMoviesList = async () => {
        const response = await getMovies();

        console.log(response);4

        if(response.status == 'success'){
            setMovies(response.data);
        }
        
    }

    useEffect(() =>{
        getMoviesList();
    },[])

  return (
    <div className="container">
        <h2 className="page-header">Movies</h2>

        <TableMoviesListing
        movies={movies}
        />


    </div>
  )
}

export default DisplayMovies