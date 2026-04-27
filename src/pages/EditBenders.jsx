import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "../pages/EditBenders.css";

function EditBenders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    await supabase
      .from("Posts")
      .update({ title, content })
      .eq("id", id);

    navigate(`/posts/${id}`); 
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditBenders;