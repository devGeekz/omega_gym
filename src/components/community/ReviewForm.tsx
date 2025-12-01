"use client";
import { useState } from "react";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setComment(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please write a review before submitting.");
      return;
    }
    console.log({ name, rating, comment });
    // Reset form
    setName("");
    setRating(0);
    setComment("");
    setCharCount(0);
  };

  return (
    <div className="bg-white rounded-2xl p-12 shadow-xl mb-16">
      <div className="text-center mb-8">
        <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold uppercase  mb-2 dark:text-black">
          Share Your Experience
        </h2>
        <p className="text-lg  max-w-2xl mx-auto dark:text-black">
          Help others by sharing your fitness journey and experience with OMEGA.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-8">
          <label
            htmlFor="reviewer-name"
            className="block font-semibold mb-2 dark:text-black"
          >
            Your Name
          </label>
          <input
            type="text"
            id="reviewer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 border-2 border-gray-500 rounded-xl text-base focus:outline-none focus:border-amber-300 focus:ring-3 focus:ring-[rgba(220,20,60,0.1)]"
          />
        </div>

        <div className="mb-8">
          <label className="block font-semibold mb-2 dark:text-black">
            Rating
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform ${
                  star <= rating ? "text-amber-300 scale-110" : "text-gray-400 "
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="review-comment"
            className="block font-semibold mb-2 text-gray-800"
          >
            Your Review
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Share your experience with FitForge..."
            maxLength={500}
            className="w-full p-4 border-2 border-gray-500 rounded-xl text-base min-h-[120px] resize-vertical focus:outline-none focus:amber-300 focus:ring-3 focus:ring-[rgba(220,20,60,0.1)]"
          />
          <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span
              className={`${
                charCount > 450
                  ? "text-red-500"
                  : charCount > 400
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              {charCount}
            </span>
            / 500 characters
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gray-400 text-white text-lg font-semibold rounded-xl hover:bg-green-500 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
