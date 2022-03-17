const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async () => {
  console.log("Log out!");
  await fetch("/auth/logout");
  window.location.replace("/");
});
