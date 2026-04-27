import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../client";
import logoo from "../assets/logoo.png";
import logooo from "../assets/logooo.png";
import "./Header.css";

function Header({ darkMode, setDarkMode }) {
  const [latestPostId, setLatestPostId] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const fetchLatestPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setLatestPostId(data.id);
      }
    };

    fetchLatestPost();
  }, [location]);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="logo-wrapper">
          <img
            src={darkMode ? logooo : logoo}
            alt="ATLA Logo"
            className="logo"
          />
        </Link>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/create" className="create-link">Create Post</Link>

        {latestPostId && (
          <Link to={`/posts/${latestPostId}`} className="view-posts-link">
            View Latest Post
          </Link>
        )}
      </div>

      <div className="nav-right">
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Header;