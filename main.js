let userArray = [];

async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?format=json');
    const data = await response.json(); 
    return data.results;
}


// fetchUsers()

console.log('is there a user', userArray)

const displayUser = () => {
    console.log('hi')
    const aUser = document.getElementById('a-User')
    console.log('is there a user 2', userArray)

    userArray.forEach((user, index) => {
        console.log('here', user.name.first)
        const li = document.createElement('li')
        // const picURL = URL.createObjectURL(`${user.picture.medium}`)
        const pic = document.createElement('img')
        pic.src = user.picture.large;
        li.appendChild(pic);
        const text = document.createTextNode(` Name: ${user.name.first} ${user.name.last}`)
        li.appendChild(text)
        aUser.append(li)
    })
}

(async () => {
    const users = await fetchUsers()

    userArray.push(...users)
displayUser()

})()