const APIURL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('main')

async function getUser(username) {
    try{
        const res = await axios(APIURL + username)
        //console.log(res.data)
        createUserCard(res.data)
        getRepos(username)
    } catch (err) {
        //console.error(err)
        if (err.response.status === 404) {
            createErrorCard('No such user')
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user) { 
        getUser(user); 
        search.value='' 
    }
})

function createErrorCard(msg) {
    const cardHTML = 
    `
    <div class='card'>
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=cardHTML
}

async function getRepos(username) {
    try{
        const res = await axios(APIURL + username + "/repos?sort=created")
        //console.log(res.data)
        addReposToCard(res.data)

    } catch (err) {
        //console.error(err)
        if (err.response.status === 404) {
            createErrorCard('Problem fetching repos')
        }
    }
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')
    repos
    .slice(0,10)
    .forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=repo.html_url
        repoEl.target="_blank"
        repoEl.innerText = repo.name
        reposEl.appendChild(repoEl)
    })
}

function createUserCard(user) {
    const cardHTML =
    `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Followings</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos">

            </div>
        </div>
    </div>
    `

    main.innerHTML = cardHTML
}