const axios = require('axios');

function* gitHubDetails(orgName) {
    const reposUrl = yield axios.get(`https://api.github.com/orgs/${orgName}`);
    yield axios.get(reposUrl);
}

const generator = gitHubDetails("globant");

generator.next().value.then(function ({data}) {
    //Update UI
    console.log(data.repos_url);
    return generator.next(data.repos_url).value;
}).then(function ({data}) {
    //Update UI
    data.forEach(element => console.log(element.name));
});