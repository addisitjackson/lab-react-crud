import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../errors/ErrorMessage";
import { getOneShow, updateShow } from "../../api/fetch";

export default function ShowEditForm() {
  const [loadingError, setLoadingError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });

  useEffect(() => {
    getOneShow(id)
      .then((showData) => {
        if (Object.keys(showData).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
          setShow(showData);
        }
      })
      .catch((err) => {
        setLoadingError(true);
      });
  }, [id]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setShow((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateShow(id, show)
      .then(() => {
        alert("Show updated");
        navigate("/shows");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="show-edit-form">
      <h1>Edit Show</h1>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={show.title}
            onChange={handleTextChange}
          />
<label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={show.description}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        id="type"
        value={show.type}
        onChange={handleTextChange}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={show.rating}
        onChange={handleTextChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={show.listedIn}
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={show.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={show.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={show.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={show.dateAdded}
        onChange={handleTextChange}
      />

          <br />

          <input type="submit" value="Update Show" />
        </form>
      )}
    </div>
  );
}
