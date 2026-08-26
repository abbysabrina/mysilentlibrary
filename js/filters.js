/* ============================================================
   Silent Library, Books page filters
   Filters the book cards by category and availability when the
   Apply filters button is clicked.
   ============================================================ */

(function () {
  var applyButton = document.getElementById("applyFilters");
  if (!applyButton) return;

  var booksGrid = document.getElementById("booksGrid");
  var booksCount = document.getElementById("booksCount");

  var categoryChecks = {
    fiction: document.getElementById("catFiction"),
    "non-fiction": document.getElementById("catNonFiction"),
    children: document.getElementById("catChildren"),
    poetry: document.getElementById("catPoetry"),
  };

  var availabilityChecks = {
    available: document.getElementById("availNow"),
    "on-loan": document.getElementById("availLoan"),
  };

  function checkedValues(checksMap) {
    var values = [];
    for (var key in checksMap) {
      if (checksMap[key] && checksMap[key].checked) {
        values.push(key);
      }
    }
    return values;
  }

  function applyFilters() {
    var selectedCategories = checkedValues(categoryChecks);
    var selectedAvailability = checkedValues(availabilityChecks);
    var cards = booksGrid.querySelectorAll("[data-category]");
    var visibleCount = 0;

    cards.forEach(function (card) {
      var cardCategory = card.getAttribute("data-category");
      var cardAvailability = card.getAttribute("data-availability");

      var matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.indexOf(cardCategory) !== -1;
      var matchesAvailability =
        selectedAvailability.length === 0 ||
        selectedAvailability.indexOf(cardAvailability) !== -1;

      if (matchesCategory && matchesAvailability) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (booksCount) {
      var totalCount = cards.length;
      booksCount.textContent =
        visibleCount === totalCount
          ? "Showing all " + totalCount + " books"
          : "Showing " + visibleCount + " of " + totalCount + " books";
    }
  }

  applyButton.addEventListener("click", applyFilters);
})();
