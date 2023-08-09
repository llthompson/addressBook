let userArray = [];

async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=60&nat=us');
    const data = await response.json(); 
    return data.results;
}



const displayUser = () => {
    const aUser = document.getElementById('a-User');

    userArray.forEach((user, index) => {
        const li = document.createElement('li');
        li.className = 'userItem'; 

        const pic = document.createElement('img');
        pic.src = user.picture.large;
        li.appendChild(pic);

        const text = document.createTextNode(`${user.name.first} ${user.name.last}`);
        const textLi = document.createElement('li');
        textLi.className = 'liName'; 
        textLi.appendChild(text);
        li.appendChild(textLi);

        const moreInfoButton = document.createElement('button');
        moreInfoButton.textContent = 'Classified:'.toUpperCase();
        moreInfoButton.addEventListener('click', () => toggleMoreInfo(li, user.dob.date, user.location.coordinates.latitude, user.location.coordinates.longitude, user.login.uuid, user.login.username));
        li.appendChild(moreInfoButton);

        aUser.appendChild(li);
    });
};


function toggleMoreInfo(li, dobDate, latitude, longitude, uuid, username) {
    const ulMoreInfo = li.querySelector('.ulMoreInfo');

    if (!ulMoreInfo) {
        const ul = document.createElement('ul');
        ul.className = 'ulMoreInfo'; 

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDob = new Date(dobDate).toLocaleString('en-US', options);

        const uidLi = document.createElement('li');
        const uuidParts = uuid.split('-');
        uidLi.textContent = `uuid: ${uuidParts[0]}`.toUpperCase();

        const dobLi = document.createElement('li');
        dobLi.textContent = `DOB: ${formattedDob}`.toUpperCase();

        const locLi = document.createElement('li');
        locLi.textContent = `Coordinates: ${latitude}, ${longitude}`.toUpperCase();

        const usrLi = document.createElement('li');
        usrLi.textContent = `Code word: ${username}`.toUpperCase();

        ul.appendChild(uidLi);
        ul.appendChild(dobLi);
        ul.appendChild(locLi);
        ul.appendChild(usrLi);
        li.appendChild(ul);

    } else {
        ulMoreInfo.remove();
    }
}

(async () => {
    const users = await fetchUsers();

    userArray.push(...users);
    displayUser();
})();
