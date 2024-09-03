let currentlyEditingIndex = null;

document.addEventListener('DOMContentLoaded', function () {
    loadEvents();

    document.getElementById('event-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const title = document.getElementById('event-title').value;
        const description = document.getElementById('event-description').value;
        const image = document.getElementById('event-image').value;

        const index = this.dataset.editIndex;
        if (index !== undefined) {
            await editEvent(index, { title, description, image });
        } else {
            await addEvent({ title, description, image });
        }

        document.getElementById('add-event-form').style.display = 'none';
        this.removeAttribute('data-edit-index');
        currentlyEditingIndex = null;
        loadEvents();
    });
});

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = tab.id === tabId ? 'block' : 'none';
    });
    if (tabId === 'siteControlTab') {
        showSubTab('mainPageTab');
    }
}

function showSubTab(tabId) {
    const subTabs = document.querySelectorAll('.sub-tab-content');
    subTabs.forEach(tab => {
        tab.style.display = tab.id === tabId ? 'block' : 'none';
    });
    if (tabId === 'mainPageTab') {
        showSubSubTab('eventsTab');
    }
}

function showSubSubTab(tabId) {
    const subSubTabs = document.querySelectorAll('.sub-sub-tab-content');
    subSubTabs.forEach(tab => {
        tab.style.display = tab.id === tabId ? 'block' : 'none';
    });
}

function showAddEventForm() {
    const form = document.getElementById('add-event-form');
    const isFormVisible = form.style.display === 'block';
    form.style.display = isFormVisible ? 'none' : 'block';
    if (isFormVisible) {
        document.getElementById('event-form').reset();
        document.getElementById('event-form').removeAttribute('data-edit-index');
    }
}

async function loadEvents() {
    try {
        const response = await fetch('Data/events_info.json');
        const events = await response.json();
        const container = document.getElementById('events-container');
        container.innerHTML = '';

        events.forEach((event, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card__image" data-title="${event.title}">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="card__content">
                    <p class="card__title">${event.title}</p>
                    <p class="card__describe">${event.description}</p>
                    <button onclick="toggleEditEvent(${index})">${currentlyEditingIndex === index ? 'Cancel' : 'Edit'}</button>
                    <button onclick="deleteEvent(${index})">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

async function addEvent(event) {
    try {
        const response = await fetch('Data/events_info.json');
        const events = await response.json();
        events.push(event);

        await fetch('Data/events_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(events)
        });
    } catch (error) {
        console.error('Error adding event:', error);
    }
}

async function editEvent(index, updatedEvent) {
    try {
        const response = await fetch('Data/events_info.json');
        const events = await response.json();
        events[index] = updatedEvent;

        await fetch('Data/events_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(events)
        });

        loadEvents();
    } catch (error) {
        console.error('Error editing event:', error);
    }
}

function toggleEditEvent(index) {
    if (currentlyEditingIndex !== null && currentlyEditingIndex !== index) {
        cancelEditEvent(currentlyEditingIndex);
    }

    const card = document.querySelectorAll('.card')[index];
    if (currentlyEditingIndex === index) {
        cancelEditEvent(index);
    } else {
        startEditEvent(index);
    }
}

function startEditEvent(index) {
    const card = document.querySelectorAll('.card')[index];
    const title = card.querySelector('.card__title').innerText;
    const description = card.querySelector('.card__describe').innerText;
    const image = card.querySelector('img').src;

    card.querySelector('.card__title').innerHTML = `<textarea id="edit-title">${title}</textarea>`;
    card.querySelector('.card__describe').innerHTML = `<textarea id="edit-description">${description}</textarea>`;

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.classList.add('save-button');
    saveButton.onclick = () => saveEvent(index);
    card.querySelector('.card__content').appendChild(saveButton);

    const imageField = document.createElement('input');
    imageField.type = 'hidden';
    imageField.id = 'edit-image';
    imageField.value = image;
    card.querySelector('.card__content').appendChild(imageField);

    currentlyEditingIndex = index;
}

function cancelEditEvent(index) {
    const card = document.querySelectorAll('.card')[index];
    const title = card.querySelector('#edit-title').value;
    const description = card.querySelector('#edit-description').value;

    card.querySelector('.card__title').innerHTML = title;
    card.querySelector('.card__describe').innerHTML = description;
    card.querySelector('.card__content').querySelector('.save-button').remove();

    currentlyEditingIndex = null;
}

async function saveEvent(index) {
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const image = document.getElementById('edit-image').value;

    await editEvent(index, { title, description, image });

    currentlyEditingIndex = null;
    loadEvents();
}

async function deleteEvent(index) {
    try {
        const response = await fetch('Data/events_info.json');
        const events = await response.json();
        events.splice(index, 1);

        await fetch('Data/events_info.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(events)
        });

        if (currentlyEditingIndex === index) {
            currentlyEditingIndex = null;
        }

        loadEvents();
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}