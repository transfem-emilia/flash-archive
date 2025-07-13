// Array of profile picture file names
const profilePictures = [
    'WavingGirlTransCanadaFlag.png',
    'WavingGirlLesbianCanadaFlag.png'
];

// Function to get a random picture from the array
function getRandomProfilePicture() {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    return profilePictures[randomIndex];
}

// Set the src attribute to a random profile picture
document.getElementById('profile-pic').src = getRandomProfilePicture();