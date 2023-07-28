const commentSubmitHandler = async (event) => {
    event.preventDefault();

const content = document.querySelector("#comment-text").value.trim()
const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

if (content) {
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
}
};}


document
  .querySelector(".comment-form")
  .addEventListener("submit", commentSubmitHandler);