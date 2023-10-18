import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Body() {
  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editedReviews, setEditedReviews] = useState({});
  const [newReview, setNewReview] = useState({
    MovieName: "",
    ReviewComments: "",
  });
  const bodyStyle = {
    marginTop: "90px",
  };

  useEffect(() => {
    // Fetch movie reviews from the GET API
    fetch("https://localhost:44365/api/MovieReview")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addReview = () => {
    // Send a POST request to add a new review
    fetch("https://localhost:44365/api/MovieReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error adding review:", error));
  };

  const updateReview = (reviewId) => {
    const updatedReview = editedReviews[reviewId];
    console.log("Updating review:", updatedReview); // Add this line
    fetch(`https://localhost:44365/api/MovieReview/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update successful! Data:", data); // Add this line
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === reviewId) {
              return { ...review, ...updatedReview };
            }
            return review;
          })
        );
        setEditReviewId(null);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  const deleteReview = (reviewId) => {
    // Send a DELETE request to delete a review
    fetch(`https://localhost:44365/api/MovieReview/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <Container style={bodyStyle}>
      <div style={{ display: "flex" }}>
        <TextField
          type="text"
          label="Movie Name"
          variant="outlined"
          value={newReview.movieName}
          onChange={(e) =>
            setNewReview({ ...newReview, movieName: e.target.value })
          }
        />
        <TextField
          type="text"
          label="Review Comments"
          variant="outlined"
          value={newReview.reviewComments}
          onChange={(e) =>
            setNewReview({ ...newReview, reviewComments: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addReview}
          style={{ marginLeft: "10px" }}
        >
          Add Review
        </Button>
      </div>

      {reviews.map((review, index) => (
        <Card key={index} style={{ marginTop: "16px" }}>
          <CardContent>
            {editReviewId === review.id ? (
              <div>
                <TextField
                  label="Movie Name"
                  value={review.movieName}
                  onChange={(e) =>
                    setReviews((prevReviews) =>
                      prevReviews.map((r) =>
                        r.id === review.id
                          ? { ...r, movieName: e.target.value }
                          : r
                      )
                    )
                  }
                />
                <TextField
                  label="Review Comments"
                  value={review.reviewComments}
                  onChange={(e) =>
                    setReviews((prevReviews) =>
                      prevReviews.map((r) =>
                        r.id === review.id
                          ? { ...r, reviewComments: e.target.value }
                          : r
                      )
                    )
                  }
                />
              </div>
            ) : (
              <div>
                <p>Movie Name: {review.movieName}</p>
                <p>Review Comments: {review.reviewComments}</p>
              </div>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteReview(review.id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (editReviewId === review.id) {
                  updateReview(review.id);
                } else {
                  setEditReviewId(review.id);
                }
              }}
            >
              {editReviewId === review.id ? "Save" : "Update"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Body;
