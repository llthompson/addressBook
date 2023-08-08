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
        li.className = 'userItem'; // Assign class 'userItem' to the <li> element

        const pic = document.createElement('img');
        pic.src = user.picture.large;
        li.appendChild(pic);

        const text = document.createTextNode(`${user.name.first} ${user.name.last}`);
        const textLi = document.createElement('li');
        textLi.className = 'liName'; // Add class 'liName' for the user's name
        textLi.appendChild(text);
        li.appendChild(textLi);

        const moreInfoButton = document.createElement('button');
        moreInfoButton.textContent = 'More Info';
        moreInfoButton.addEventListener('click', () => toggleMoreInfo(li, user.dob.date));
        li.appendChild(moreInfoButton);

        aUser.appendChild(li);
    });
};

// Rest of your code remains the same


function toggleMoreInfo(li, dobDate) {
    const ulMoreInfo = li.querySelector('.ulMoreInfo');

    if (!ulMoreInfo) {
        const ul = document.createElement('ul');
        ul.className = 'ulMoreInfo'; // Add class 'ulMoreInfo' for the additional info

        const options = { month: 'short', day: 'numeric' };
        const formattedDob = new Date(dobDate).toLocaleString('en-US', options);

        const dobLi = document.createElement('li');
        dobLi.textContent = `DOB: ${formattedDob}`;

        ul.appendChild(dobLi);
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
