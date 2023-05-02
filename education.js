window.onload = function() {
    initContacts();  
    showContacts();
  };
function initContacts() {
  const defaultContacts = [
    { name: "Emergency Services", phoneNumber: "911" },
    { name: "National Suicide Prevention Lifeline", phoneNumber: "1-800-273-TALK (8255)" },
    { name: "Crisis Text Line", phoneNumber: "Text HOME to 741741" },
    { name: "National Domestic Violence Hotline", phoneNumber: "1-800-799-SAFE (7233)" }
  ];
  if (!localStorage.getItem("contacts")) {
    localStorage.setItem("contacts", JSON.stringify(defaultContacts));
  }
}
function addPhoneNumber() {
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phone-number").value;
  if (name && phoneNumber) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, phoneNumber });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    document.getElementById("name").value = "";
    document.getElementById("phone-number").value = "";
    alert("Contact saved.");
  } else {
    alert("Please enter a name and phone number.");
  }
  showContacts();
}
function showContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let contactsHtml = "<p><strong>List of current crisis/help phone numbers:</strong><br>";
  contacts.forEach((contact) => {
    contactsHtml += `<span style="display:inline-block;width:300px">${contact.name}:</span> ${contact.phoneNumber}<br>`;
  });
  contactsHtml += "</p>";
  document.getElementById("contact-list").innerHTML = contactsHtml;
}

function showPhoneNumberForm() {
  showContacts();
  document.getElementById("phone-number-form").classList.remove("hidden");
}