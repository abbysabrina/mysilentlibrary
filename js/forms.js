/* ============================================================
   Silent Library, static form helper
   Used by the Book Reserve, Event Registration and New Joiner
   Registration forms. Since this site has no backend, submitting
   a form shows a simple confirmation message instead of sending
   data anywhere. Also fills in a form field from a URL query
   parameter, e.g. reserve.html?book=The+Quiet+Hour
   ============================================================ */

(function () {
  // Pre-fill a text field from a query string parameter.
  // <input data-sl-prefill-param="book"> gets filled from ?book=...
  var params = new URLSearchParams(window.location.search);
  document.querySelectorAll("[data-sl-prefill-param]").forEach(function (field) {
    var paramName = field.getAttribute("data-sl-prefill-param");
    var value = params.get(paramName);
    if (value) {
      field.value = decodeURIComponent(value.replace(/\+/g, " "));
    }
  });

  // Static form submit, show a confirmation message instead of posting.
  document.querySelectorAll("form[data-sl-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var confirmationId = form.getAttribute("data-sl-form");
      var confirmation = document.getElementById(confirmationId);
      form.classList.add("d-none");
      if (confirmation) {
        confirmation.classList.remove("d-none");
        confirmation.focus();
      }
    });
  });
})();
