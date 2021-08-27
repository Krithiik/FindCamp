const toggleBtn = document.querySelector("#showReviewForm");
const reviewForm = document.querySelector("#reviewForm");
const list = reviewForm.classList;
toggleBtn.addEventListener("click", () => {
  console.log("in");
  if (list.contains("isHidden")) {
    list.remove("isHidden");
  } else {
    list.add("isHidden");
  }
});
