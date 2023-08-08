let userArray = [];

async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=60&nat=us');
    const data = await response.json(); 
    return data.results;
}



const displayUser = () => {
    const aUser = document.getElementById('a-User')
    // console.log('is there a user', userArray)

    userArray.forEach((user, index) => {
        console.log('here', user.name.first)
        const li = document.createElement('li')
        const pic = document.createElement('img')
        pic.src = user.picture.large;
        li.appendChild(pic);
        const text = document.createTextNode(`${user.name.first} ${user.name.last}`)
        const moreInfo = document.createTextNode(` ${user.dob.date}`)
        li.appendChild(text)
        li.appendChild(moreInfo)
        aUser.append(li)
    })
}

(async () => {
    const users = await fetchUsers()

    userArray.push(...users)
displayUser()

// console.log('final test', userArray)

})()

