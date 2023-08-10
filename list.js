resultsContainer = document.querySelector("#results-container");
placeholderResult = document.querySelector("#example-card");

window.onload = (event) => {
  for (let scholarship of scholarships) {
    let resultTile = placeholderResult.cloneNode(true);
    resultTile.style.display = "block";
    websiteLink = document.querySelector(".website-link");
    resultTile.children[0].innerHTML = scholarship["Scholarship Name"];
    websiteLink.href = scholarship.Website;
    resultTile.children[1].innerHTML = scholarship.Amount;
    resultTile.children[2].innerHTML = scholarship.Deadline;
    resultTile.children[3].innerHTML = scholarship.Eligibility;
    resultTile.removeAttribute("id");
    resultTile.setAttribute("class", "result-card");
    resultsContainer.appendChild(resultTile);
  }
};
