
const Form = document.getElementById('person');

Form.addEventListener('submit', function (e) {
	e.preventDefault();

	const formData = new FormData(this);

	// Изменение 'Content-Type' с multipart/form-data на application/json
	var object = {};
	formData.forEach((value, key) => {object[key] = value});
	var json = JSON.stringify(object);

	fetch('https://us-central1-mercdev-academy.cloudfunctions.net/login', {
		method: 'post',
		headers: {
             'Content-Type': 'application/json',
         },
  		body: json
	}).then(function (response) {
		return (response.text());
	}).then(function (text) {

		var a = JSON.parse(text);
		console.log(a);
  
		if (a.name) {
			document.querySelector('.LogIn').classList.add("done");
			document.getElementById('person').classList.add("done");
			document.getElementById('name').innerHTML='<div class="name">' + a.name + '</div>';
			document.getElementById('avatar').innerHTML='<img src="'+ a.photoUrl +'">';
			document.getElementById('btn-logout').innerHTML='<button>Logout</button>';
		} else {
			document.getElementById('incorrect').innerHTML="<p>E-Mail or password is incorrect</p>";
			document.getElementById('inp-mail').classList.add("error");
		}
	})
});

