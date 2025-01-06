document.addEventListener('DOMContentLoaded', function () {
    loadComments();

    document.getElementById('comments-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const author = document.getElementById('comment-author').value;
        const text = document.getElementById('comment-text').value;

        const index = this.dataset.editIndex;
        if (index !== undefined) {
            await editComment(index, { author, text });
        } else {
            await addComment({ author, text });
        }

        document.getElementById('comments-form').reset();
        document.getElementById('add-comment-form').style.display = 'none';
        document.getElementById('add-comment-button').style.display = 'block';
        this.removeAttribute('data-edit-index');
        currentlyEditingIndex = null;
        loadComments();
    });

    document.getElementById('add-comment-button').addEventListener('click', showAddCommentForm);
});

async function loadComments() {
    try {
        const response = await fetch('Data/Comments_info.json');
        const comments = await response.json();
        const container = document.getElementById('comments-container');
        container.innerHTML = '';

        const currentLanguage = 'en'; // Update if needed

        comments.forEach((comment, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card__image">
                    <img src="${comment.imageUrl}" alt="User Image">
                </div>
                <div class="card__content">
                    <p class="card__author">${comment.username[currentLanguage]}</p>
                    <p class="card__text">${comment.description[currentLanguage]}</p>
                    <button onclick="toggleEditComment(${index})">${currentlyEditingIndex === index ? 'Cancel' : 'Edit'}</button>
                    <button onclick="deleteComment(${index})">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

async function addComment(comment) {
    try {
        const response = await fetch('Data/Comments_info.json');
        const comments = await response.json();
        comments.push(comment);

        await fetch('Data/Comments_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comments)
        });
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

async function editComment(index, updatedComment) {
    try {
        const response = await fetch('Data/Comments_info.json');
        const comments = await response.json();
        comments[index] = updatedComment;

        await fetch('Data/Comments_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comments)
        });
    } catch (error) {
        console.error('Error editing comment:', error);
    }
}

function toggleEditComment(index) {
    if (currentlyEditingIndex !== null && currentlyEditingIndex !== index) {
        cancelEditComment(currentlyEditingIndex);
    }

    if (currentlyEditingIndex === index) {
        cancelEditComment(index);
    } else {
        startEditComment(index);
    }
}

function startEditComment(index) {
    console.log('Starting edit for index:', index);

    const cards = document.querySelectorAll('.card');
    if (index < 0 || index >= cards.length) {
        console.error('Index out of bounds:', index);
        return;
    }

    const card = cards[index];
    if (!card) {
        console.error('Card element not found for index:', index);
        return;
    }

    const authorElement = card.querySelector('.card__author');
    const textElement = card.querySelector('.card__text');

    if (!authorElement || !textElement) {
        console.error('Author or text element not found in card at index:', index);
        return;
    }

    const author = authorElement.innerText;
    const text = textElement.innerText;

    authorElement.innerHTML = `<textarea id="edit-author-${index}">${author}</textarea>`;
    textElement.innerHTML = `<textarea id="edit-text-${index}">${text}</textarea>`;

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.classList.add('save-button');
    saveButton.onclick = () => saveComment(index);
    card.querySelector('.card__content').appendChild(saveButton);

    currentlyEditingIndex = index;
}


function cancelEditComment(index) {
    const card = document.querySelectorAll('.card')[index];
    if (!card) {
        console.error('Card not found for index:', index);
        return;
    }

    const author = card.querySelector(`#edit-author-${index}`).value;
    const text = card.querySelector(`#edit-text-${index}`).value;

    card.querySelector('.card__author').innerHTML = author;
    card.querySelector('.card__text').innerHTML = text;
    card.querySelector('.card__content').querySelector('.save-button').remove();

    currentlyEditingIndex = null;
}

async function saveComment(index) {
    const author = document.querySelector(`#edit-author-${index}`).value;
    const text = document.querySelector(`#edit-text-${index}`).value;

    await editComment(index, { author, text });

    currentlyEditingIndex = null;
    loadComments();
}

async function deleteComment(index) {
    try {
        const response = await fetch('Data/Comments_info.json');
        const comments = await response.json();
        comments.splice(index, 1);

        await fetch('Data/Comments_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comments)
        });

        if (currentlyEditingIndex === index) {
            currentlyEditingIndex = null;
        }

        loadComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

function showAddCommentForm() {
    const form = document.getElementById('add-comment-form');
    const isFormVisible = form.style.display === 'block';
    form.style.display = isFormVisible ? 'none' : 'block';

    if (form.style.display === 'block') {
        const commentAuthor = document.getElementById('comment-author');
        if (commentAuthor) {
            commentAuthor.focus();
        }
    }
}
