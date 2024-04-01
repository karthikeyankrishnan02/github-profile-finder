import { useEffect, useState } from "react";
import User from "./User";
import "./styles.css";

export default function GithubProfileFinder() {
  const [userName, setUserName] = useState("karthikeyankrishnan02");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchGithubUserData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    fetchGithubUserData();
  }

  useEffect(() => {
    fetchGithubUserData();
  }, []);

  if (loading) {
    return <h1>Loading data! Please wait...</h1>;
  }

  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input
          name="search-by-username"
          type="text"
          placeholder="Search Github Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      {userData !== null ? (
        <User user={userData} />
      ) : (
        <div>User not found.</div>
      )}
    </div>
  );
}
