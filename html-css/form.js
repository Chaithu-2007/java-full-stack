document.getElementById("details").addEventListener("submit", function(event) {
    event.preventDefault();

    let Name = document.getElementById("name").value;
    let Email = document.getElementById("mail").value;
    let Phone = document.getElementById("phone").value;
    let Age = document.getElementById("age").value;
    let DOB = document.getElementById("dob").value;
    let Address = document.getElementById("address").value;

    let genderInput = document.querySelector('input[name="gender"]:checked');
    let Gender = genderInput ? genderInput.value : "Not Selected";

    let Documents = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(item) {
        Documents.push(item.value);
    });

    document.getElementById("p1").innerText = "Name: " + Name;
    document.getElementById("p2").innerText = "Email: " + Email;
    document.getElementById("p3").innerText = "Mobile: " + Phone;
    document.getElementById("p4").innerText = "Age: " + Age;
    document.getElementById("p5").innerText = "DOB: " + DOB;
    document.getElementById("p6").innerText = "Gender: " + Gender;
    document.getElementById("p7").innerText = "Address: " + Address;
    document.getElementById("p8").innerText = "Documents: " +
        (Documents.length ? Documents.join(", ") : "None");

    let image = document.getElementById("image").files[0];

    if (image) {
        let reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById("dp").src = e.target.result;
        };

        reader.readAsDataURL(image);
    }
});