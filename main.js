// Data from the Python code
const books = ['The Hobbit', 'Dune', 'The Martian', '1984', 'Pride and Prejudice',
    'The Da Vinci Code', 'Neuromancer', 'The Hunger Games', 'Gone Girl',
    'Harry Potter', 'Brave New World', 'The Fault in Our Stars',
    'The Girl with the Dragon Tattoo', 'A Game of Thrones', 'Ender’s Game',
    'Divergent', 'Me Before You', 'Sherlock Holmes: A Study in Scarlet',
    'Frankenstein', 'Red Queen', 'Demo'
];

const incidenceMatrix = [
    [1, 0, 0, 0, 0, 0], // The Hobbit: (Fantasy)
    [1, 1, 0, 0, 0, 0], // Dune: (Fantasy, Sci-Fi)
    [0, 1, 0, 0, 0, 0], // The Martian: (Sci-Fi)
    [0, 1, 0, 1, 0, 0], // 1984: (Sci-Fi, Dystopian)
    [0, 0, 0, 0, 1, 0], // Pride and Prejudice: (Romance)
    [0, 0, 1, 0, 0, 1], // The Da Vinci Code: (Mystery, Thriller)
    [0, 1, 0, 1, 0, 1], // Neuromancer: (Sci-Fi, Dystopian, Thriller)
    [1, 0, 0, 1, 0, 0], // The Hunger Games: (Fantasy, Dystopian)
    [0, 0, 1, 0, 0, 1], // Gone Girl: (Mystery, Thriller)
    [1, 0, 0, 0, 0, 0], // Harry Potter: (Fantasy)
    [0, 1, 0, 1, 0, 0], // Brave new world: (Sci-Fi, Dystopian)
    [0, 0, 0, 0, 1, 0], // The Fault in our Stars: (Romance)
    [0, 0, 1, 0, 0, 1], // The Girl with the Dragon Tattoo: (Mystry, Thriller)
    [1, 0, 0, 0, 1, 0], // The Game of Thrones: (Fantasy, Romance)
    [0, 1, 0, 0, 0, 0], // Ender's Game: (Sci-Fi)
    [0, 1, 0, 1, 0, 0], // Divergent: (Sci-Fi, Dystopian)
    [0, 0, 0, 0, 1, 0], // Me Before you: (Romance)
    [0, 0, 1, 0, 0, 0], // Sherlock Holmes: A Study in Scarlet: (Mystry)
    [0, 1, 1, 0, 0, 0], // Frankenstein: (Sci-Fi, Mystry)
    [1, 0, 0, 1, 1, 0], // Red Queen: (Fantasy, Dystopian, Romance)
    [0, 0, 0, 0, 0, 0], // Demo: (No taste)
];

const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Dystopian', 'Romance', 'Thriller'];

// Dummy data for book covers and authors (Replace with real data!)
const bookData = {
    "The Hobbit": {
        cover: "Images/The Hobbit.jpg",
        author: "J.R.R. Tolkien"
    },
    "Dune": {
        cover: "Images/Dune.jpg",
        author: "Frank Herbert"
    },
    "The Martian": {
        cover: "Images/The Martian.jpg",
        author: "Andy Weir"
    },
    "1984": {
        cover: "Images/The 1984.jpg",
        author: "George Orwell"
    },
    "Pride and Prejudice": {
        cover: "Images/Pride and Prejudice.jpg",
        author: "Jane Austen"
    },
    "The Da Vinci Code": {
        cover: "Images/Da vinci code.jpg",
        author: "Dan Brown"
    },
    "Neuromancer": {
        cover: "Images/Neuromencer.jpg",
        author: "William Gibson"
    },
    "The Hunger Games": {
        cover: "Images/The Hunger Games.jpg",
        author: "Suzanne Collins"
    },
    "Gone Girl": {
        cover: "Images/Gone Girl.jpg",
        author: "Gillian Flynn"
    },
    "Harry Potter": {
        cover: "Images/Harry Potter.jpg",
        author: "J.K. Rowling"
    },
    "Brave New World": {
        cover: "Images/Brave new world.jpg",
        author: "Aldous Huxley"
    },
    "The Fault in Our Stars": {
        cover: "Images/The Fault in our Stars.jpg",
        author: "John Green"
    },
    "The Girl with the Dragon Tattoo": {
        cover: "Images/The girl with the dragin tatto.jpg",
        author: "Stieg Larsson"
    },
    "A Game of Thrones": {
        cover: "Images/A game of thrones.jpg",
        author: "George R.R. Martin"
    },
    "Ender’s Game": {
        cover: "Images/Enders Game.jpg",
        author: "Orson Scott Card"
    },
    "Divergent": {
        cover: "Images/Divergent.jpg",
        author: "Veronica Roth"
    },
    "Me Before You": {
        cover: "Images/Me before you.jpg",
        author: "Jojo Moyes"
    },
    "Sherlock Holmes: A Study in Scarlet": {
        cover: "Images/Sherlocks Holmes.jpg",
        author: "Arthur Conan Doyle"
    },
    "Frankenstein": {
        cover: "Images/Frankenstein.jpg",
        author: "Mary Shelley"
    },
    "Red Queen": {
        cover: "Images/Red queen.jpg",
        author: "Victoria Aveyard"
    },
    "Demo": {
        cover: "placeholder_cover.png", // Replace with a placeholder image
        author: "Unknown"
    }

};

function getBookIndex(bookName, bookList) {
    try {
        return bookList.indexOf(bookName);
    } catch (ValueError) {
        return -1;
    }
}

function recommend(targetBook, books, boolMatrix) {
    const idx = getBookIndex(targetBook, books);
    if (idx === -1) {
        return [];
    }

    const targetVector = boolMatrix[idx];
    const similarities = {};

    for (let i = 0; i < boolMatrix.length; i++) {
        if (i === idx) continue;

        let sharedGenres = 0;
        for (let j = 0; j < targetVector.length; j++) {
            if (targetVector[j] && boolMatrix[i][j]) {
                sharedGenres++;
            }
        }
        if (sharedGenres > 0) {
            similarities[books[i]] = sharedGenres;
        }
    }

    const sortedBooks = Object.entries(similarities).sort(([, a], [, b]) => b - a);
    return sortedBooks.slice(0, 15); //top 15 books will be recommended
}

function matchBook(userInput, bookList) {
    userInput = userInput.toLowerCase().trim();
    const lowerMap = bookList.reduce((acc, book) => {
        acc[book.toLowerCase()] = book;
        return acc;
    }, {});

    if (lowerMap[userInput]) {
        return lowerMap[userInput];
    }

    const matches = bookList.filter(book => book.toLowerCase().includes(userInput));

    if (matches.length === 1) {
        return matches[0];
    } else if (matches.length > 1) {
        let selection = prompt("Multiple matches found:\n" + matches.map((book, i) => `${i + 1}. ${book}`).join('\n') + "\nEnter the number of the book you meant:");
        if (selection && !isNaN(selection) && selection >= 1 && selection <= matches.length) {
            return matches[selection - 1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function getRecommendations() {
    const userInput = document.getElementById('book-input').value;
    const target = matchBook(userInput, books);
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous results

    if (!target) {
        recommendationsDiv.innerHTML = "<p class='no-results'>Book not found or unclear. Please try again with a clearer name.</p>";
    } else {
        const recommendations = recommend(target, books, incidenceMatrix);

        if (recommendations.length === 0) {
            recommendationsDiv.innerHTML = `<p class='no-results'>No recommendations found for '${target}' based on shared genres.</p>`;
        } else {
            recommendations.forEach(([book, score]) => {
                const bookInfo = bookData[book];
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');

                bookCard.innerHTML = `
                    <img src="${bookInfo.cover}" alt="${book} cover" class="book-cover">
                    <h3 class="book-title">${book}</h3>
                    <p class="book-author">By ${bookInfo.author}</p>
                `;

                const genreDiv = document.createElement('div');
                genreDiv.classList.add('book-genres');

                // Get genres for the book
                const bookIndex = books.indexOf(book);
                const bookGenresIndices = [];
                for (let i = 0; i < incidenceMatrix[bookIndex].length; i++) {
                    if (incidenceMatrix[bookIndex][i] === 1) {
                        bookGenresIndices.push(i);
                    }
                }
                const bookGenres = bookGenresIndices.map(index => genres[index]);

                bookGenres.forEach(genre => {
                    const genreTag = document.createElement('span');
                    genreTag.classList.add('genre-tag');
                    genreTag.textContent = genre;
                    genreDiv.appendChild(genreTag);
                });

                bookCard.appendChild(genreDiv);
                recommendationsDiv.appendChild(bookCard);
            });
        }
    }
}