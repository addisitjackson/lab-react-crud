import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";
import { getOneShow, destroyShow } from "../../api/fetch";

function Show() { 
  // state to hold Show initialized to an empty object - data of a show
  const [show, setShow] = useState({});
  //state to hold error state - intialized to a false
  const [loadingError, setLoadingError] = useState(false);
  // example route: http://localhost:5173/shows/SLHUwyN
  const { id } = useParams();
  const navigate = useNavigate();
  // in this case id = "SLHUwyN"


  function handleDelete(id) {
    destroyShow(id)
      .then(() => {
        alert("show deleted");
        setShow({});
        setLoadingError(false);
        navigate("/shows")
      })
      .catch((err) => {
        console.error(err)
      })
  }
  useEffect(() => {
    getOneShow(id)
      .then((show) => {
        // updates our state variable with data
        setShow(show)
      }
      )
      .catch((err) => {
        console.error(err)
      }
      )
  }, [id])

 

  function handleUpdateShow(id) {
    setShow({})
    setLoadingError(false);
    // this is the same as the above but we are passing the id to the edit route
  }
  useEffect(() => {
    getOneShow(id)
      .then((show) => {
        // updates our state variable with data
        setShow(show);
        // because state in an obj we need to check Object.keys()
        if (Object.keys(show).length === 0) {
          setLoadingError(true)
        } else {
          setLoadingError(false)
        }
      })
      .catch((err) => {
        console.error(err)
        setLoadingError(true)
      })
  },[id])


  
  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(show.id)}>
                Remove Show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button className="edit-show" onClick={() => handleUpdateShow(show.id)}>Edit Show</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;
