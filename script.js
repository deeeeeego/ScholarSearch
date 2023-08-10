searchBtn = document.querySelector("#submit");
searchInput = document.querySelector("#ourInput");
resultsContainer = document.querySelector("#results-container");
placeholderResult = document.querySelector("#example-card");
belowTitle = document.querySelector("#below-title");
ErrorMsg = document.createElement("h2");

let resultsFound;
let searchTerms = [];
let results = [];

searchBtn.onclick = (event) => {
  clearResults();
  searchTerms = searchInput.value.split(" ");

  for (let scholarship of scholarships) {
    let eligibility = scholarship.Eligibility.toLowerCase();
    let relevanceScore = calculateRelevanceScore(eligibility, searchTerms);

    if (relevanceScore > 0) {
      scholarship.relevanceScore = relevanceScore;
      results.push(scholarship);
    }
  }

  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  for (let scholarship of results) {
    let resultTile = placeholderResult.cloneNode(true);
    resultTile.style.display = "block";
    resultTile.children[0].innerHTML = scholarship["Scholarship Name"];
    resultTile.children[0].href = scholarship.Website;
    resultTile.children[1].innerHTML = scholarship.Amount;
    resultTile.children[2].innerHTML = scholarship.Deadline;
    resultTile.children[3].innerHTML = scholarship.Eligibility;
    resultTile.removeAttribute("id");
    resultTile.setAttribute("class", "result-card");
    resultsContainer.appendChild(resultTile);
    resultsFound = true;
  }
  if (results.length === 0) {
    ErrorMsg.innerHTML = "No results found :(";
    resultsContainer.appendChild(ErrorMsg);
    console.log(results.length);
  } else {
    ErrorMsg.remove();
  }
};

function clearResults() {
  if (ErrorMsg.innerHTML != undefined) {
    ErrorMsg.remove();
  }

  while (results.length > 0) {
    resultsContainer.removeChild(resultsContainer.lastChild);
    results.pop();
    console.log("removed");
  }
  resultsFound = undefined;
}

function calculateRelevanceScore(eligibility, searchTerms) {
  let score = 0;
  for (let searchTerm of searchTerms) {
    searchTerm = searchTerm.toLowerCase();

    if (
      eligibility.includes(" " + searchTerm + " ") ||
      eligibility.includes(searchTerm)
    ) {
      score++;
    }
  }
  return score;
}
