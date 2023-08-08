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
        moreInfoButton.textContent = 'More Info';
        moreInfoButton.addEventListener('click', () => toggleMoreInfo(li, user.dob.date));
        li.appendChild(moreInfoButton);

        aUser.appendChild(li);
    });
};


function toggleMoreInfo(li, dobDate) {
    const ulMoreInfo = li.querySelector('.ulMoreInfo');

    if (!ulMoreInfo) {
        const ul = document.createElement('ul');
        ul.className = 'ulMoreInfo'; 

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDob = new Date(dobDate).toLocaleString('en-US', options);

        const dobLi = document.createElement('li');
        dobLi.textContent = `Birthday: ${formattedDob}`;

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
