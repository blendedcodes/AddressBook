window.onload = function () {
    const addBtn = document.getElementById("addBtn");
    const editBtn = document.getElementById("editBtn");
    const delBtn = document.getElementById("delBtn");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");

    let contacts = document.querySelector(".contacts");
    const contactDisplay = document.querySelector(".contactDisplay");

    contacts = [
        {
            name:"Xeenarh Abah",        
            email:"xeebah@gmail.com",
            tel:"07030000034"
        },
        {
            name:"Tolu Falana",        
            email:"falu@mail.com",
            tel:"07030000034"
        }
    ];

    function jsonStructure(name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
    }

    addBtn.addEventListener("click", function () {
        let newObj = new jsonStructure(name.value, email.value, tel.value);
        contacts.push(newObj);
        localStorage['contactBook'] = JSON.stringify(contacts);
        clearForm();

    })
    
    

    function clearForm() {
        let myForm = document.querySelectorAll(".formFields");
        for (let i in myForm) {
            myForm[i].value = '';
        }
    }

    function showContacts() {
        if (localStorage['contactBook'] === undefined) {
            localStorage['contactBook'] = "[]";
        } else {
            contacts = JSON.parse(localStorage['contactBook']);
            for (let n in contacts) {
                var str = '<br>' + '<button class="accordion">' + contacts[n].name + '</button>' + '<div class="panel"><p><strong>Email Address : </strong>' + contacts[n].email + '</p><p><strong>Phone Number : </strong>' + contacts[n].tel + ' </p><div class="del go-right"> | <a href="#" class="button delBtn" data-id="' + n + '">Delete</a></div><div class="go-right"><a href="#" class="button editBtn" data-id="' + n + '">Edit</a></div></div>';
                contactDisplay.innerHTML += str;
            }
        }
    }
    showContacts();
    
    function CloseInput() {
     document.getElementById('spoiler').style.display = 'none';
    }

    contactDisplay.addEventListener("click", function (e) {
      if(e.target.classList.contains("delBtn")){
          var chosen = e.target.getAttribute("data-id");
          contacts.splice(chosen, 1);
          localStorage['contactBook'] = JSON.stringify(contacts);
          // showContacts();
          alert("Please refresh this page after deleting a contact.");
      }
      if(e.target.classList.contains("editBtn")){
        // Get all fields in new form
        var name = document.getElementById('edit-name');
        var email = document.getElementById('edit-email');
        var tel = document.getElementById('edit-tel');
        var id = e.target.getAttribute("data-id");
        // Assign values to edit form
        name.value = contacts[id].name;
        email.value = contacts[id].email;
        tel.value = contacts[id].tel;
        // Display fields in form
        document.getElementById('spoiler').style.display = 'block';
        
        // On submitting the form...
        document.getElementById('saveEdit').onsubmit = function() {
          var newName = name.value;
          var newEmail = email.value;
          var newTel = tel.value;
          // Remove old data
          contacts.splice(id, 1);
          // Create a new object with updated info
          let newObj = new jsonStructure(newName, newEmail, newTel);
          contacts.push(newObj);
          localStorage['contactBook'] = JSON.stringify(contacts);
          // Close the form
          CloseInput();
        }
      }
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle "active" class */
            this.classList.toggle("active");

            /* Toggle hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}