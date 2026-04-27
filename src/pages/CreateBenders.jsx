import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "../pages/CreateBenders.css";

function CreateBenders() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("Posts")
      .insert([
        {
          title,
          content: content || null,
          upvotes_count: 0,
        },
      ])
      .select();

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to create post.");
    } else {
      const newPostId = data[0].id;
      navigate(`/posts/${newPostId}`); 
    }
  };

  return (
    <div className="create-page">
      <h1>Got something interesting? Share it with us</h1>

      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter post content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreateBenders;