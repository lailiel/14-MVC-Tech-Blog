const postSubmitHandler = async (event) => {

    const postTitle = document.querySelector("#post-title").value.trim()
    const postContent = document.querySelector("#post-content").value.trim()

    
    if (postContent) {
        const response = await fetch('/api/post', {
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
        document.location.reload();
    }
    };
    }
    
    
    document
      .querySelector(".post-form")
      .addEventListener("submit", postSubmitHandler);

// -------------------------------------------------------

const postUpdateHandler = async (event) => {

    const postTitle = document.querySelector("#post-title").value.trim()
    const postContent = document.querySelector("#post-content").value.trim()

    const deletePost = event.target;
    const postId = deletePost.getAttribute('data-post-id');   
    if (window.confirm("Delete post?") == true && postId) {
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



// -------------------------------------------------------


const postDeleteHandler = async (event) => {

    const deletePost = event.target;
    const postId = deletePost.getAttribute('data-post-id');   
    if (window.confirm("Delete post?") == true && postId) {
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