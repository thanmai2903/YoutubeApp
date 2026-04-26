import React, { useState } from "react";

const initialComments = [
  {
    id: 1,
    name: "Narasimha",
    text: "This video is amazing 🔥",
    replies: [
      {
        id: 2,
        name: "Nani",
        text: "Yes bro totally agree!",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    name: "Thanmai",
    text: "Very helpful content 🙌",
    replies: [],
  },
];


// 🔥 ADD REPLY
const addReply = (comments, parentId, reply) => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, reply],
      };
    }
    return {
      ...comment,
      replies: addReply(comment.replies, parentId, reply),
    };
  });
};


// 🔥 DELETE COMMENT (recursive)
const deleteComment = (comments, id) => {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: deleteComment(comment.replies, id),
    }));
};


// 🔥 EDIT COMMENT
const editComment = (comments, id, newText) => {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, text: newText };
    }
    return {
      ...comment,
      replies: editComment(comment.replies, id, newText),
    };
  });
};


// 🔥 SINGLE COMMENT
const Comment = ({ data, onReply, onDelete, onEdit }) => {
  const { id, name, text } = data;

  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleReply = () => {
    if (!replyText.trim()) return;

    onReply(id, {
      id: Date.now(),
      name: "You",
      text: replyText,
      replies: [],
    });

    setReplyText("");
    setShowReply(false);
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 my-3">
      
      {/* Avatar */}
      <img
        className="w-9 h-9 rounded-full"
        src={`https://i.pravatar.cc/100?u=${name}`}
        alt="user"
      />

      <div className="flex flex-col w-full">
        
        <p className="text-sm font-semibold">{name}</p>

        {/* 🔥 EDIT MODE */}
        {isEditing ? (
          <div className="flex gap-2 mt-1">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border-b outline-none text-sm w-full"
            />
            <button
              onClick={handleEdit}
              className="text-blue-600 text-sm"
            >
              Save
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-700 mt-1">
            {text}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          
          <button
            onClick={() => setLiked(!liked)}
            className={liked ? "text-blue-600 font-semibold" : ""}
          >
            👍 {liked ? "Liked" : "Like"}
          </button>

          <button onClick={() => setShowReply(!showReply)}>
            💬 Reply
          </button>

          <button onClick={() => setIsEditing(!isEditing)}>
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(id)}
            className="text-red-500"
          >
            🗑 Delete
          </button>
        </div>

        {/* Reply Input */}
        {showReply && (
          <div className="flex gap-2 mt-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="border-b outline-none text-sm w-full"
            />
            <button
              onClick={handleReply}
              className="text-blue-600 text-sm"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// 🔥 COMMENT LIST
const CommentList = ({ comments, onReply, onDelete, onEdit }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      
      <Comment
        data={comment}
        onReply={onReply}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      {comment.replies.length > 0 && (
        <div className="ml-8 pl-4 border-l border-gray-300">
          <CommentList
            comments={comment.replies}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      )}
    </div>
  ));
};


// 🔥 MAIN
const CommentsContainer = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleReply = (parentId, reply) => {
    setComments(addReply(comments, parentId, reply));
  };

  const handleDelete = (id) => {
    setComments(deleteComment(comments, id));
  };

  const handleEdit = (id, text) => {
    setComments(editComment(comments, id, text));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: "You",
      text: newComment,
      replies: [],
    };

    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-6">
      
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        💬 Comments
      </h2>

      {/* Add comment */}
      <div className="flex gap-3 sm:gap-3 mb-6">
        <img
          className="w-9 h-9 sm:w-9 sm:h-9 rounded-full"
          src="https://i.pravatar.cc/100"
          alt="user"
        />
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          placeholder="Add a comment..."
          className="w-full border-b outline-none pb-1 text-sm sm:text-sm"
        />
        <button
          onClick={handleAddComment}
          className="text-blue-600 text-xs sm:text-sm"
        >
          Post
        </button>
      </div>

      {/* Comments */}
      <CommentList
        comments={comments}
        onReply={handleReply}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CommentsContainer;