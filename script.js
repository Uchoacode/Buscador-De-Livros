console.log('script.js loaded');
document.getElementById('search').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Impede o comportamento padrão de submissão do formulário
        searchBooks();
    }
});

function searchBooks() {
    const query = document.getElementById('search').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.items) {
                data.items.forEach(item => {
                    const title = item.volumeInfo.title;
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown';

                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');
                    bookDiv.innerHTML = `
                        <h3>${title}</h3>
                        <p>Author(s): ${authors}</p>
                    `;
                    resultsDiv.appendChild(bookDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            }
        })
        .catch(error => console.error('Erro:', error));
}
