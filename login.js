function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // You can add your authentication logic here
    // For example, you can send a request to the server to verify the username and password
  
    // If the authentication is successful, redirect to the disclaimer page
    window.location.href = "disclaimerPage.html";
  }
  