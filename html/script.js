// Array of group photo file names
const groupPhotos = ['group1.jpg', 'group2.jpg', 'group3.jpg'];

// Function to display a random photo
function displayRandomPhoto() {
    const randomIndex = Math.floor(Math.random() * groupPhotos.length);
    document.getElementById('group-photo').src = `../images/${groupPhotos[randomIndex]}`;
}

// Function to show an individual friend's photo
function showFriendPhoto(filename) {
    const photo = document.getElementById('group-photo');
    photo.src = `../images/${filename}`;
    photo.alt = "Friend's photo";
}

// Load a random photo on page load
window.onload = displayRandomPhoto;
