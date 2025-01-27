import React, { useEffect, useState } from 'react';

function RedditDataDisplay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.reddit.com/r/reactjs.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to determine styles based on screen width
  const getResponsiveStyles = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      // Mobile styles
      return {
        container: { padding: '10px' },
        post: { margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
        title: { fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' },
        meta: { fontSize: '12px', color: '#555' },
        thumbnail: { width: '100%', height: 'auto', marginTop: '10px' },
      };
    } else {
      // Desktop styles
      return {
        container: { padding: '20px' },
        post: { margin: '15px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' },
        title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
        meta: { fontSize: '14px', color: '#555' },
        thumbnail: { width: '150px', height: 'auto', marginTop: '10px' },
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Reddit Posts</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((post, index) => (
          <li key={index} style={styles.post}>
            <h2 style={styles.title}>{post.data.title}</h2>
            <p style={styles.meta}>Subreddit: {post.data.subreddit}</p>
            <p style={styles.meta}>Upvotes: {post.data.ups}</p>
            <a
              href={post.data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}
            >
              {post.data.url}
            </a>
            {post.data.thumbnail && post.data.thumbnail !== 'self' && (
              <img src={post.data.thumbnail} alt={post.data.title} style={styles.thumbnail} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RedditDataDisplay;
