document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Convert formData to JSON object
        const requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });

        const url = 'http://localhost:3000/register'; // URL for the POST request

        const options = {
            method: 'POST',
            body:formData,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        // Send the request using fetch with the URL and options
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("message").innerText = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById("message").innerText = 'An error occurred during registration';
        });
    });
});
