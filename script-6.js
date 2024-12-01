async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:4000/get-books');
        const data = await response.json();

        if (response.ok) {
            const books = data.books;
            const bookGrid = document.getElementById('book-grid');
            bookGrid.innerHTML = '';

            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');

                // Book Image
                const bookImage = document.createElement('img');
                bookImage.src = `http://localhost:4000/${book.photos[0]}`;
                bookImage.alt = `Cover of ${book.title}`;
                bookImage.classList.add('book-photo');
                bookCard.appendChild(bookImage);

                // Book Title
                const bookTitle = document.createElement('h3');
                bookTitle.textContent = book.title;
                bookCard.appendChild(bookTitle);

                // Book Price
                const bookPrice = document.createElement('p');
                bookPrice.textContent = `Price: $${book.price}`;
                bookCard.appendChild(bookPrice);

                // Store book details in localStorage on click
                bookCard.onclick = () => {
                    localStorage.setItem('selectedBook', JSON.stringify(book));
                    window.location.href = 'index-7.html';
                };

                // Append the card to the grid
                bookGrid.appendChild(bookCard);
            });
        } else {
            alert('Failed to load books');
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('An error occurred while fetching books');
    }
}

window.onload = fetchBooks;
