let comments = [];
let likes = [];
let activeForm = '';

function toggleContentOptions() {
    const contentOptions = document.getElementById('content-options');
    if (contentOptions.style.display === 'none' || contentOptions.style.display === '') {
        contentOptions.style.display = 'block';
    } else {
        contentOptions.style.display = 'none';
    }
}

function addPost() {
    const postForm = document.getElementById('post-form');
    const eventForm = document.getElementById('event-form');
    const STARTCAFEForm = document.getElementById('STARTCAFE-form');
    const postList = document.querySelector('.posts');

    if (postForm.style.display === 'block') {
        postForm.style.display = 'none';
        activeForm = '';
    } else {
        postForm.style.display = 'block';
        eventForm.style.display = 'none';
        STARTCAFEForm.style.display = 'none';
        postList.style.display = 'block';
        activeForm = 'post-form';
    }
}

function addEvent() {
    const postForm = document.getElementById('post-form');
    const eventForm = document.getElementById('event-form');
    const STARTCAFEForm = document.getElementById('STARTCAFE-form');
    const eventList = document.querySelector('.events');

    if (eventForm.style.display === 'block') {
        eventForm.style.display = 'none';
        activeForm = '';
    } else {
        eventForm.style.display = 'block';
        postForm.style.display = 'none';
        STARTCAFEForm.style.display = 'none';
        eventList.style.display = 'block';
        activeForm = 'event-form';
    }
}

function addSTARTCAFE() {
    const postForm = document.getElementById('post-form');
    const eventForm = document.getElementById('event-form');
    const STARTCAFEForm = document.getElementById('STARTCAFE-form');
    const STARTCAFEList = document.querySelector('.STARTCAFE');

    if (STARTCAFEForm.style.display === 'block') {
        STARTCAFEForm.style.display = 'none';
        activeForm = '';
    } else {
        STARTCAFEForm.style.display = 'block';
        postForm.style.display = 'none';
        eventForm.style.display = 'none';
        STARTCAFEList.style.display = 'block';
        activeForm = 'STARTCAFE-form';
    }
}

function openWindow(windowId) {
    const windows = ['post-form', 'event-form', 'STARTCAFE-form'];
    windows.forEach(id => {
        const windowElement = document.getElementById(id);
        if (id === windowId) {
            windowElement.style.display = 'block';
            activeForm = windowId;
        } else {
            windowElement.style.display = 'none';
        }
    });
}

document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];
    const video = document.getElementById('post-video').value;

    const list = document.getElementById('post-list');

    const newElement = document.createElement('div');
    newElement.className = 'post';

    let innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="post-actions">
            <button onclick="toggleComments(this)">Comments</button>
            <button onclick="likePost(this)">👍</button>
            <button onclick="addComment(this)">Add Comment</button>
        </div>
        <div class="comments-section" style="display:none;"></div>
    `;

    newElement.innerHTML = innerHTML;

    if (image) {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(image);
        newElement.appendChild(imageElement);
    }

    if (video) {
        const videoElement = document.createElement('iframe');
        videoElement.src = video;
        newElement.appendChild(videoElement);
    }

    list.appendChild(newElement);
    document.getElementById('post-form').style.display = 'none';

    checkNewPostForWhatsApp();
});

document.getElementById('new-event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('event-title').value;
    const content = document.getElementById('event-content').value;
    const date = document.getElementById('event-date').value;
    const arrivalTime = document.getElementById('event-arrival-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const image = document.getElementById('event-image').files[0];
    const location = document.getElementById('event-location').value;

    const eventList = document.getElementById('event-list');
    const newEventElement = document.createElement('div');
    newEventElement.className = 'event';

    newEventElement.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <p>Date: ${date}</p>
        <p>Arrival Time: ${arrivalTime}</p>
        <p>End Time: ${endTime}</p>
        <p>Location: ${location}</p>
        <div class="post-actions">
            <button onclick="toggleComments(this)">Comments</button>
            <button onclick="likePost(this)">👍</button>
            <button onclick="addComment(this)">Add Comment</button>
        </div>
        <div class="comments-section" style="display:none;"></div>
    `;

    if (image) {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(image);
        newEventElement.appendChild(imageElement);
    }

    eventList.appendChild(newEventElement);
    document.getElementById('event-form').style.display = 'none';
});

function checkNewPostForWhatsApp() {
    fetch('/send_new_post', {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        send_whatsapp_message(data);
    })
}

function toggleComments(button) {
    const post = button.parentNode.parentNode;
    const commentsSection = post.querySelector('.comments-section');
    if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
        commentsSection.style.display = 'block';
        const index = Array.prototype.indexOf.call(post.parentNode.children, post);
        let commentsHTML = '';
        if (comments[index]) {
            comments[index].forEach((comment, commentIndex) => {
                commentsHTML += `<div class="comment">${comment}<div class="comment-actions"><button onclick="likeComment(this, ${index}, ${commentIndex})">Like</button></div></div>`;
            });
        }
        commentsSection.innerHTML = commentsHTML;
    } else {
        commentsSection.style.display = 'none';
    }
}

function likePost(button) {
    const post = button.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(post.parentNode.children, post);
    if (likes[index] === undefined) {
        likes[index] = 0;
    }
    if (!button.classList.contains('liked')) {
        likes[index]++;
        button.innerText = `👍 (${likes[index]})`;
        button.classList.add('liked');
    } else {
        likes[index]--;
        button.innerText = `👍 (${likes[index]})`;
        button.classList.remove('liked');
    }
}

function addComment(button) {
    const post = button.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(post.parentNode.children, post);
    const comment = prompt("Enter your comment:");
    if (comment !== null) {
        if (comments[index] === undefined) {
            comments[index] = [];
        }
        comments[index].push(comment);
        const commentsSection = post.querySelector('.comments-section');
        commentsSection.style.display = 'block';
        const commentHTML = `<div class="comment">${comment}<div class="comment-actions"><button onclick="likeComment(this, ${index}, ${comments[index].length - 1})">Like</button></div></div>`;
        commentsSection.insertAdjacentHTML('beforeend', commentHTML);
        alert("Comment added successfully!");
    }
}

function likeComment(button, postIndex, commentIndex) {
    if (likes[postIndex] === undefined) {
        likes[postIndex] = [];
    }
    if (likes[postIndex][commentIndex] === undefined) {
        likes[postIndex][commentIndex] = 0;
    }
    if (!button.classList.contains('liked')) {
        likes[postIndex][commentIndex]++;
        button.innerText = `👍 (${likes[postIndex][commentIndex]})`;
        button.classList.add('liked');
    } else {
        likes[postIndex][commentIndex]--;
        button.innerText = `👍 (${likes[postIndex][commentIndex]})`;
        button.classList.remove('liked');
    }
}

function closeAllForms() {
    document.getElementById('post-form').style.display = 'none';
    document.getElementById('event-form').style.display = 'none';
    document.getElementById('STARTCAFE-form').style.display = 'none';

    document.getElementById('add-post-button').style.display = 'none';
    document.getElementById('add-event-button').style.display = 'none';
    document.getElementById('add-STARTCAFE-button').style.display = 'none';
}

function closeFormsExcept(visibleFormId) {
    const formIds = ['post-form', 'event-form', 'STARTCAFE-form'];
    const buttonIds = ['add-post-button', 'add-event-button', 'add-STARTCAFE-button'];

    formIds.forEach(formId => {
        if (formId !== visibleFormId) {
            document.getElementById(formId).style.display = 'none';
        }
    });

    buttonIds.forEach(buttonId => {
        if (buttonId !== `add-${visibleFormId.split('-')[0]}-button`) {
            document.getElementById(buttonId).style.display = 'none';
        }
    });
}

async function showPosts() {
    closeFormsExcept('post-form');

    document.querySelectorAll('.posts').forEach(post => {
        post.style.display = 'block';
    });
    document.querySelectorAll('.events').forEach(event => {
        event.style.display = 'none';
    });
    document.querySelectorAll('.STARTCAFE').forEach(STARTCAFE => {
        STARTCAFE.style.display = 'none';
    });

    setTimeout(async () => {
        const isAdminUser = await isAdmin();
        if (isAdminUser) {
            document.getElementById('add-post-button').style.display = 'block';
        }
    }, 0);
}

async function showEvents() {
    closeFormsExcept('event-form');

    document.querySelectorAll('.posts').forEach(post => {
        post.style.display = 'none';
    });
    document.querySelectorAll('.events').forEach(event => {
        event.style.display = 'block';
    });
    document.querySelectorAll('.STARTCAFE').forEach(STARTCAFE => {
        STARTCAFE.style.display = 'none';
    });

    setTimeout(async () => {
        const isAdminUser = await isAdmin();
        if (isAdminUser) {
            document.getElementById('add-event-button').style.display = 'block';
        }
    }, 0);
}

async function showSTARTCAFE() {
    closeFormsExcept('STARTCAFE-form');

    document.querySelectorAll('.posts').forEach(post => {
        post.style.display = 'none';
    });
    document.querySelectorAll('.events').forEach(event => {
        event.style.display = 'none';
    });
    document.querySelectorAll('.STARTCAFE').forEach(STARTCAFE => {
        STARTCAFE.style.display = 'block';
    });

    document.getElementById('add-STARTCAFE-button').style.display = 'block';
}

async function fetchDataFromGoogleSheet() {
    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1WrsrKtGqjdwbaL20Cs7TmScQNVp5kJRKcN0P6wHmdko/values/signupSTARTrim-form!A:J?key=AIzaSyAYSge_Rg_xblZbyj9vHdhMJzZOrGFylqI');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

function displayUserInfo() {
    const userData = getUserDataFromCookie();

    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        usernameElement.textContent = userData.username;
    }

    const userIdElement = document.querySelector('.user-id');
    if (userIdElement) {
        const fullName = `${userData.first_name} ${userData.last_name}`;
        userIdElement.textContent = `@${fullName}`;
    }
}
function displayUserInfo() {
    const userData = getUserDataFromCookie();

    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        usernameElement.textContent = userData.username;
    }

    const userIdElement = document.querySelector('.user-id');
    if (userIdElement) {
        const fullName = `${userData.first_name} ${userData.last_name}`;
        userIdElement.textContent = `@${fullName}`;
    }
}

function getUserDataFromCookie() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    const userData = {};

    cookieArray.forEach(cookie => {
        cookie = cookie.trim();
        if (cookie.startsWith("username=")) {
            userData.username = cookie.substring("username=".length);
        } else if (cookie.startsWith("first_name=")) {
            userData.first_name = cookie.substring("first_name=".length);
        } else if (cookie.startsWith("last_name=")) {
            userData.last_name = cookie.substring("last_name=".length);
        }
    });

    return userData;
}

async function isAdmin() {
    const userData = getUserDataFromCookie();
    const email = userData.username;
    const data = await fetchDataFromGoogleSheet();

    if (!data || !email) {
        console.error('Data or email not found');
        return false;
    }

    for (const row of data) {
        if (row[0] === email && row[9] && row[9].toUpperCase() === 'TRUE') {
            console.log('Admin status confirmed');
            return true;
        }
    }
    console.log('Admin status not found');
    return false;
}

async function displayLoggedInUser() {
    const loggedInUser = getUserDataFromCookie();
    if (loggedInUser.username) {
        alert(`Logged in as: ${loggedInUser.username}`);
        const isAdminUser = await isAdmin();

        const adminLink = document.querySelector('ul li a[href="adminSpace.html"]');
        const sideMenuAdminLink = document.querySelector('#side-menu a[href="adminSpace.html"]');

        if (isAdminUser) {
            if (adminLink) adminLink.style.display = 'block';
            if (sideMenuAdminLink) sideMenuAdminLink.style.display = 'block';
            document.getElementById('add-post-button').style.display = 'block';
            document.getElementById('add-event-button').style.display = 'block';
            document.getElementById('add-STARTCAFE-button').style.display = 'none';
        } else {
            if (adminLink) adminLink.style.display = 'none';
            if (sideMenuAdminLink) sideMenuAdminLink.style.display = 'none';
            document.getElementById('add-post-button').style.display = 'none';
            document.getElementById('add-event-button').style.display = 'none';
            document.getElementById('add-STARTCAFE-button').style.display = 'none';
        }

        const hasAddPostPermission = await isAdmin('add_post');
        const hasAddEventPermission = await isAdmin('add_event');

        if (!hasAddPostPermission) {
            document.getElementById('add-post-button').style.display = 'none';
        }

        if (!hasAddEventPermission) {
            document.getElementById('add-event-button').style.display = 'none';
        }

        showPosts();
    }
}

displayUserInfo();
displayLoggedInUser();

window.onload = displayLoggedInUser;
