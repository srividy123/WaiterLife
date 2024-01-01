document.addEventListener('DOMContentLoaded', function() {
    const addExpenseButton = document.getElementById('addExpense');

    addExpenseButton.addEventListener('click', function() {
        const dishValue = document.getElementById('dish').value;
        const priceValue = document.getElementById('price').value;
        const tableValue = document.getElementById('table').value;

        // Validate input
        if (!dishValue || !priceValue) {
            alert('Please enter both dish and price.');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');

        // Create span elements for displaying information
        const dishInfo = document.createElement('span');
        dishInfo.textContent = `Dish: ${dishValue}, Price: $${priceValue}`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // Remove the list item when the delete button is clicked
            listItem.remove();
        });

        // Append elements to the list item
        listItem.appendChild(dishInfo);
        listItem.appendChild(deleteButton);

        // Append the new list item to the respective table
        document.getElementById(tableValue).appendChild(listItem);

        // Clear input fields after adding expense
        document.getElementById('dish').value = '';
        document.getElementById('price').value = '';

        // Make an API call to CRUD CRUD to update the backend
        const apiUrl = 'https://crudcrud.com/api/51cf886154f14e85860ac4c04012f1f4'; // Replace with your actual API endpoint
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dish: dishValue,
                price: priceValue,
                table: tableValue,
            }),
        };

        fetch(apiUrl, requestData)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update backend.');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data as needed
                console.log('Backend updated successfully:', data);
            })
            .catch(error => {
                console.error('Error updating backend:', error.message);
            });
    });
});
