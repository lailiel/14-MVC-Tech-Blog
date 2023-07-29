const postSubmitHandler = async (event) => {

    const postTitle = document.querySelector("#post-title").value.trim()
    const postContent = document.querySelector("#post-content").value.trim()

    
    if (newContent) {
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
    };}
    
    
    document
      .querySelector(".post-form")
      .addEventListener("submit", postSubmitHandler);