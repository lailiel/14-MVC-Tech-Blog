// -------------------------------------------------------
// new post

const postSubmitHandler = async (event) => {
  const postTitle = document.querySelector("#post-title").value.trim();
  const postContent = document.querySelector("#post-content").value.trim();

  if (postTitle) {
    const response = await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      window.location.href = "/api/user/dashboard";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.querySelector(".post-form");
    if (postForm) {
      postForm.addEventListener("submit", postSubmitHandler);
    }
  });

// -------------------------------------------------------
// update post

const postUpdateHandler = async (event) => {
  const postTitle = document.querySelector("#edit-post-title").value.trim();
  const postContent = document.querySelector("#edit-post-content").value.trim();

  const postId = document
    .querySelector(".post-form")
    .getAttribute("data-post-id");
    console.log(postId)
  if (postId) {
    try {
      const response = await fetch(`/api/post/${postId}/edit`, {
        method: "PUT",
        body: JSON.stringify({
          "title": postTitle,
          "content": postContent,
          "id": postId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.href = "/api/user/dashboard";
      } else {
        console.log("Error updating post", response.statusText);
      }
    } catch (err) {
      console.log("Error update the post", err);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.querySelector(".post-form");
    if (postForm) {
      postForm.addEventListener("submit", postUpdateHandler);
    }
  });

// -------------------------------------------------------
// delete post

const postDeleteHandler = async (event) => {
  const deletePost = event.target;
  const postId = deletePost.getAttribute("data-post-id");
  if (window.confirm("Delete post?") && postId) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelectorAll(".dashboard-post");
    posts.forEach((post) => {
      post.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-post")) {
          postDeleteHandler(event);
        }
      });
    });
  });