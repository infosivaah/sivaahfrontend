import { useState } from "react";

const API_URL = "https://sivaahbackend.onrender.com";

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const LIKE_OPTIONS = [
  "Design",
  "Quality",
  "Weight",
  "Value for Money",
  "Packaging",
  "Gift Worthiness",
];

export default function ReviewForm({
  productId,
  onReviewSubmitted,
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [liked, setLiked] = useState([]);
  const [channel, setChannel] = useState("");

  const [photos, setPhotos] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /* =========================
     TOGGLE LIKED OPTION
  ========================= */

  const toggleLiked = (option) => {
    setLiked((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }

      return [...prev, option];
    });
  };


  /* =========================
     SELECT PHOTOS
  ========================= */

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);

    // Maximum 3 photos
    const selectedFiles = files.slice(0, 3);

    // Basic image validation
    const validFiles = selectedFiles.filter((file) => {
      const validType = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);

      const validSize = file.size <= 5 * 1024 * 1024;

      return validType && validSize;
    });

    if (files.length > 3) {
      setError("You can upload a maximum of 3 photos.");
      return;
    }

    if (validFiles.length !== selectedFiles.length) {
      setError(
        "Only JPG, PNG or WebP images up to 5MB are allowed."
      );
      return;
    }

    setError("");
    setPhotos(validFiles);
  };


  /* =========================
     UPLOAD IMAGE TO CLOUDINARY
  ========================= */

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
          "Failed to upload image."
      );
    }

    return data.secure_url;
  };


  /* =========================
     UPLOAD ALL PHOTOS
  ========================= */

  const uploadPhotos = async () => {
    if (!photos.length) {
      return [];
    }

    setUploadingPhotos(true);

    try {
      const uploadedUrls = [];

      for (const photo of photos) {
        const url = await uploadToCloudinary(photo);

        uploadedUrls.push(url);
      }

      return uploadedUrls;

    } finally {
      setUploadingPhotos(false);
    }
  };


  /* =========================
     SUBMIT REVIEW
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");


    /* =========================
       FRONTEND VALIDATION
    ========================= */


    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      setError("Please write your review.");
      return;
    }

  


    try {
      setSubmitting(true);


      /* =========================
         1. UPLOAD PHOTOS
      ========================= */

      const photoUrls = await uploadPhotos();


      /* =========================
         2. SEND REVIEW TO BACKEND
      ========================= */

      const response = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productId,

            name: name.trim(),

            rating,

            review: review.trim(),

            liked,

            channel: channel.trim(),

            photos: photoUrls,
          }),
        }
      );


      const data = await response.json();


      /* =========================
         BACKEND ERROR
      ========================= */

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to submit review."
        );
      }


      /* =========================
         SUCCESS
      ========================= */

      setSuccess(
        "Thank you! Your review has been submitted."
      );


      /* =========================
         RESET FORM
      ========================= */

      setName("");
      setRating(0);
      setReview("");
      setLiked([]);
      setChannel("");
      setPhotos([]);


      /* =========================
         CALLBACK
      ========================= */

      if (onReviewSubmitted) {
        onReviewSubmitted(data.review);
      }

    } catch (err) {
      console.error(
        "Review submission error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="sivaah-review-form"
    >

      {/* =========================
          NAME
      ========================= */}

      <div className="sivaah-review-field">

        <label htmlFor="review-name">
          Your Name
        </label>

        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your name"
          maxLength={100}
          disabled={submitting}
        />

      </div>


      {/* =========================
          RATING
      ========================= */}

      <div className="sivaah-review-field">

        <label>
          Your Rating
        </label>

        <div
          className="sivaah-star-selector"
          role="radiogroup"
          aria-label="Rating"
        >

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={
                star <= rating
                  ? "sivaah-star active"
                  : "sivaah-star"
              }
              onClick={() =>
                setRating(star)
              }
              disabled={submitting}
              aria-label={`${star} star${
                star > 1 ? "s" : ""
              }`}
            >
              ★
            </button>
          ))}

        </div>

      </div>


      {/* =========================
          REVIEW
      ========================= */}

      <div className="sivaah-review-field">

        <label htmlFor="review-text">
          Your Review
        </label>

        <textarea
          id="review-text"
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          placeholder="Tell us about your experience..."
          rows={5}
          maxLength={2000}
          disabled={submitting}
        />

        <div className="sivaah-review-counter">
          {review.length}/2000
        </div>

      </div>


      {/* =========================
          WHAT DID YOU LIKE?
      ========================= */}

      <div className="sivaah-review-field">

        <label>
          What did you like?
        </label>

        <div className="sivaah-like-options">

          {LIKE_OPTIONS.map((option) => {

            const selected =
              liked.includes(option);

            return (
              <button
                key={option}
                type="button"
                className={
                  selected
                    ? "sivaah-like-chip selected"
                    : "sivaah-like-chip"
                }
                onClick={() =>
                  toggleLiked(option)
                }
                disabled={submitting}
              >
                {option}
              </button>
            );

          })}

        </div>

      </div>


      {/* =========================
          CHANNEL - OPTIONAL
      ========================= */}

      <div className="sivaah-review-field">

        <label htmlFor="review-channel">
          Purchase Channel
          <span className="optional">
            Optional
          </span>
        </label>

        <input
          id="review-channel"
          type="text"
          value={channel}
          onChange={(e) =>
            setChannel(e.target.value)
          }
          placeholder="e.g. Website, Instagram, Store, Amazon..."
          maxLength={100}
          disabled={submitting}
        />

      </div>


      {/* =========================
          PHOTOS - OPTIONAL
      ========================= */}

      <div className="sivaah-review-field">

        <label htmlFor="review-photos">
          Add Photos
          <span className="optional">
            Optional
          </span>
        </label>

        <input
          id="review-photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handlePhotoChange}
          disabled={submitting}
        />

        <small>
          Maximum 3 photos · JPG, PNG or WebP ·
          5MB each
        </small>


        {/* PHOTO PREVIEW */}

        {photos.length > 0 && (

          <div className="sivaah-review-photo-list">

            {photos.map((photo, index) => (

              <div
                key={`${photo.name}-${index}`}
                className="sivaah-review-photo"
              >

                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Review photo ${index + 1}`}
                />

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div
          className="sivaah-review-error"
          role="alert"
        >
          {error}
        </div>
      )}


      {/* =========================
          SUCCESS
      ========================= */}

      {success && (
        <div
          className="sivaah-review-success"
          role="status"
        >
          {success}
        </div>
      )}


      {/* =========================
          SUBMIT
      ========================= */}

      <button
        type="submit"
        className="sivaah-review-submit"
        disabled={
          submitting ||
          uploadingPhotos
        }
      >
        {uploadingPhotos
          ? "Uploading Photos..."
          : submitting
          ? "Submitting..."
          : "Submit Review"}
      </button>

    </form>
  );
}