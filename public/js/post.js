// const { response } = require("express");

const postSubmitHandler = async (event) => {

    const postTitle = document.querySelector("#post-title").value.trim()
    const postContent = document.querySelector("#post-content").value.trim()

    
    if (postTitle) {
        const response = await fetch('/api/post/new', {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    console.log(response)
    
    if (response.ok) {
       redirected("/api/user/dashboard");
    }
    };
    }
    
    
    document
      .querySelector(".post-form")
      .addEventListener("submit", postSubmitHandler);

// -------------------------------------------------------

const postUpdateHandler = async (event) => {

    const postTitle = document.querySelector("#edit-post-title").value.trim()
    const postContent = document.querySelector("#edit-post-content").value.trim()

    const updatePost = event.target;
    const postId = updatePost.getAttribute('data-post-id');   
    if (postTitle) {
        const response = await fetch(`/api/post/${postId}/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    if (response.ok) {
        document.location.reload();
    }
    };

    document
    .querySelector(".post-form")
    .addEventListener("submit", postUpdateHandler);



// -------------------------------------------------------


const postDeleteHandler = async (event) => {

    const deletePost = event.target;
    const postId = deletePost.getAttribute('data-post-id');   
    if (window.confirm("Delete post?") && postId) {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
        });

    if (response.ok) {
        document.location.reload();
    }
    };
    }

    document
        .querySelector(".dashboard-post")
        .addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-post")) {
          postDeleteHandler(event);
        }
      });