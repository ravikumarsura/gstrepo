import React, { useEffect, useState } from "react";
import "./Demo.css";

function Payment() {
  // First branch changes
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://www.reddit.com/r/reactjs.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData.data.children);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="payment-container">
      <h1 className="payment-header">Reddit Posts</h1>
      <ul className="payment-list">
        {data.map((post, index) => (
          <li key={index} className="payment-post">
            <h2 className="payment-title">{post.data.title}</h2>
            <p className="payment-meta">Subreddit: {post.data.subreddit}</p>
            <p className="payment-meta">Upvotes: {post.data.ups}</p>
            <a
              href={post.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-link"
            >
              {post.data.url}
            </a>
            {post.data.thumbnail && post.data.thumbnail !== "self" && (
              <img
                src={post.data.thumbnail}
                alt={post.data.title}
                className="payment-thumbnail"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payment;
