const form = document.querySelector("#formulario");
const tweet = document.querySelector("#tweet");
const tweetList = document.querySelector("#lista-tweets");

function addTweetToList(tweets) {
  tweetList.innerHTML = "";
  tweets.forEach((tweet, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      > <span>${tweet}</span> <span class="delete-tweet borrar-tweet" data-id=${index}>X</span>
    `;
    tweetList.appendChild(div);
  });
  tweet.value = "";
}

function addTweet(e) {
  e.preventDefault();

  const newTweet = tweet.value;

  if (newTweet === "") {
    const p = document.createElement("p");
    p.innerText = "Don't leave empty tweet";
    p.classList.add("error");
    form.before(tweet, p);
    return;
  }

  const tweetLast = JSON.parse(localStorage.getItem("tweet")) || [];
  tweetLast.push(newTweet);
  localStorage.setItem("tweet", JSON.stringify(tweetLast));
  addTweetToList(tweetLast);
}

function deleteTweet(e) {
  if (e.target.classList.contains("delete-tweet")) {
    const tweetId = e.target.getAttribute("data-id");

    const tweetLast = JSON.parse(localStorage.getItem("tweet"));
    tweetLast.splice(tweetId, 1);

    localStorage.setItem("tweet", JSON.stringify(tweetLast));
    addTweetToList(tweetLast);
  }
}

function validateTweet(e) {
  if (e.target.value === "") {
    const p = document.createElement("p");
    p.innerText = "Don't leave empty tweet";
    p.classList.add("error");
    form.before(tweet, p);
  } else {
    const p = document.querySelector("p");
    if (p) {
      p.remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tweetLast = JSON.parse(localStorage.getItem("tweet")) || [];
  addTweetToList(tweetLast);

  tweet.addEventListener("blur", validateTweet);
  form.addEventListener("submit", addTweet);

  tweetList.addEventListener("click", deleteTweet);
});
