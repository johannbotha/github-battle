var axios = require('axios');

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username);
}

function getRepos (username) {
  // fetch usernames repos
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getTotalStars (repos) {
  // calculate all the stars that the user has
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0);

}

function getPlayersData (player) {
  //get repos
  //get total stars
  // return object with data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    });
}

function calculateScores (players) {

  console.log('calculate scores ', players);

  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}


var helpers = {
  getPlayersInfo: function (players) {
    return axios.all(players.map(function (username) {
      return getUserInfo(username);

    })).then(function (info) {
      console.log('info', info);
      return info.map((user) => {
        return user.data;
      });

    }).catch(function (err) {
      console.warn('Error in getPlayersInfo', err);
    });
  },

  battle: function (players) {
    console.log('input to battle...', players);
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function(err) {
        console.warn('Error in getPlayersInfo: ', err);
      })
  }
};

module.exports = helpers;