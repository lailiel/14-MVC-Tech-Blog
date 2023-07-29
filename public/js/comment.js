const commentSubmitHandler = async (event) => {

const newContent = document.querySelector("#comment-text").value.trim()
const commentPostId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

if (newContent) {
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            content: newContent,
            post_id: commentPostId,
            
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
  .querySelector(".comment-form")
  .addEventListener("submit", commentSubmitHandler);