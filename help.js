
function showHelpOld() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let contactsHtml = "";
    contacts.forEach((contact) => {
      contactsHtml += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <span style="display:inline-block;width:100px">${contact.name}:</span>
      <span style="display:inline-block;width:150px">${contact.phoneNumber}</span>
      <button class="btn btn-primary" style="align-self: center;" onclick="window.location.href='tel:${contact.phoneNumber}'">Call</button>
    </div>`;
  
    });
  
    let helpHtml = `
      <div class="help-overlay-content">
        <h1>List of current crisis/help phone numbers</h1>
        <div class="contacts-wrapper">
          ${contactsHtml}
        </div>
        <button class="btn btn-primary mt-3" onclick="hideHelp()">Close</button>
      </div>
    `;
  
    const style = document.createElement('style');
    style.innerHTML = `
      #help-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .help-overlay-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        max-width: 600px;
        width: 100%;
        max-height: 80%;
        overflow-y: auto;
        text-align: center;
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .contacts-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .close-btn {
        position: relative;
      }
    `;
  
    document.head.appendChild(style);
    document.getElementById('help-overlay').innerHTML = helpHtml;
    document.getElementById('help-overlay').style.display = 'block';
  }
  
  function showHelp() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let contactsHtml = "";
    contacts.forEach((contact) => {
      // contactsHtml += `<li><span>call ${contact.name}: </span><a href="tel:${contact.phoneNumber}">${contact.phoneNumber}</a></li>`;
      contactsHtml += `<li><a href="tel:${contact.phoneNumber}">Call ${contact.name}: ${contact.phoneNumber}</a></li>`;
    });
  
    let helpHtml = `
      <div class="help-overlay-content">
        <h1>List of current crisis/help phone numbers</h1>
        <ul class="contacts-list">
          ${contactsHtml}
        </ul>
        <button class="btn btn-primary mt-3" onclick="hideHelp()">Close</button>
      </div>
    `;
  
    const style = document.createElement('style');
    style.innerHTML = `
      #help-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #help-overlay p {
        color: white;
        font-size: 20px;
      }
      .help-overlay-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        max-width: 600px;
        width: 100%;
        max-height: 80%;
        overflow-y: auto;
        text-align: center;
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .contacts-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      .contacts-list li {
        margin: 10px 0;
        cursor: pointer;
      }
      .contacts-list li:hover {
        text-decoration: underline;
      }
      .close-btn {
        position: relative;
      }
    `;
  
    document.head.appendChild(style);
    document.getElementById('help-overlay').innerHTML = helpHtml;
    document.getElementById('help-overlay').style.display = 'block';
  
    // Add click event listeners to each contact
    const contactsListItems = document.querySelectorAll('.contacts-list li');
    contactsListItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const phoneNumber = event.target.href.split(':')[1];
        window.location.href = `tel:${phoneNumber}`;
      });
    });
  }
  
  
  function hideHelp() {
      document.getElementById('help-overlay').style.display = 'none';
  }
  