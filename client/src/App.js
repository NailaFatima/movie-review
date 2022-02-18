import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setmovieName]= useState('');
  const [review, setReview]= useState('');
  const [movieReviewList, setMovieReviewList]= useState([]);

  const [newReview, setNewReview]= useState('');

   useEffect (()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieReviewList(response.data);
    })
   }, []);
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/add", {movieName: movieName, movieReview: review});
  
    setMovieReviewList([
      ...movieReviewList,
      {movieName: movieName, movieReview: review}]);

    setmovieName('');
    setReview('');
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update",{movieName: movie, movieReview: newReview});
    setNewReview("");
  };

   const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };


  return (
    <div className="App">
      <div className= "form">
      <label>Movie</label>
      <input type="text" onChange={(e)=> {setmovieName(e.target.value)}}/>
        <label>Movie Review</label>
      <input type="text" onChange={(e)=> {setReview(e.target.value)}}/>
        <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((val)=>{
            return(
              <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={()=>{updateReview(val.movieName)}}>Update</button>
              <input type="text" id="updateReview" onChange={(e)=>{setNewReview(e.target.value)}}/>
              <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
              </div>
              )
            })}
        </div>
  </div>
  );
}

export default App;
