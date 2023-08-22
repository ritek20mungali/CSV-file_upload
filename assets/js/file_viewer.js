document.getElementById("go").addEventListener("click", searchTable);

function searchTable(event) {
  event.preventDefault();
  // Get the input value and convert it to lowercase
  const input = document.getElementById("search-input").value.toLowerCase();
  
  // Get all table rows and iterate through them
  const rows = document.getElementsByTagName("tr");

  let found = false; // Flag to track if a match is found

  for (let i = 0; i < rows.length; i++) {
    const rowText = rows[i].textContent.toLowerCase();
    
    if (rowText.includes(input)) {
      rows[i].classList.add("highlight");
      rows[i].scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the highlighted row
      found = true; // Set the flag to true
    } else {
      rows[i].classList.remove("highlight");
    }  
  }

  if (!found) {
    // If no match is found, provide feedback to the user
    console.log("No matching rows found.");
  }
}
