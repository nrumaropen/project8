import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import "../pages/ReadBenders.css";

function ReadBenders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const postId = Number(id); 

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) console.error("Post error:", error);
    else setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) console.error("Comments error:", error);
    else setComments(data || []);
  };

  const fetchOtherPosts = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error) setOtherPosts(data || []);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchPost();
      await fetchComments();
      await fetchOtherPosts();
      setLoading(false);
    };

    load();
  }, [id]);

  const handleUpvote = async () => {
    if (!post) return;

    await supabase
      .from("Posts")
      .update({ upvotes_count: post.upvotes_count + 1 })
      .eq("id", postId);

    fetchPost();
  };

  const handleDeletePost = async () => {
    await supabase.from("Posts").delete().eq("id", postId);
    navigate("/");
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const { data, error } = await supabase
      .from("Comments")
      .insert({
        post_id: postId,
        text: commentText,
        likes: 0
      })
      .select();

    if (error) console.error(error);
    else {
      setCommentText("");
      fetchComments();
    }
  };

  const handleDeleteComment = async (commentId) => {
    await supabase.from("Comments").delete().eq("id", commentId);
    fetchComments();
  };

  const handleLikeComment = async (comment) => {
    await supabase
      .from("Comments")
      .update({ likes: (comment.likes || 0) + 1 })
      .eq("id", comment.id);

    fetchComments();
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-page">
      <div className="card-post-card">
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        <p className="post-meta">
          {new Date(post.created_at).toLocaleString()} ·{" "}
          {post.upvotes_count} likes
        </p>

        <div className="card-buttons">
          <button onClick={handleUpvote}>Like</button>
          <button onClick={() => navigate(`/edit/${postId}`)}>Edit</button>
          <button onClick={handleDeletePost}>Delete</button>
        </div>

        <hr />

        <div className="comment-card">
          <h3>Comments</h3>

          <div className="comment-input">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Post</button>
          </div>

          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment-box">

                <p>{c.text}</p>

                <div className="comment-actions">
                  <button onClick={() => handleLikeComment(c)}>
                    Like {c.likes || 0}
                  </button>

                  <button onClick={() => handleDeleteComment(c.id)}>
                     Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      <div className="more-posts">
        <h3>More Posts</h3>

        {otherPosts.map((p) => (
          <div key={p.id}>
            <div>{p.title}</div>
            <Link to={`/posts/${p.id}`}>View</Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ReadBenders;