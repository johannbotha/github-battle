var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

function puke (object) {
  return <pre>{JSON.stringify(object, null, ' ')}</pre>
}

var ConfirmBattleContainer = React.createClass({
  contextTypes : {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: () => {
    return {
      isLoading: true,
      playersInfo : []
    }
  },
  componentDidMount: function () {
    //fetching info from github...

    var query = this.props.location.query;
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then((players) => {
        console.log('players be', players);
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      });
  },

  handleInitiateBattle: function () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  },

  render: function() {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo}
        />
    )
  }
});

module.exports = ConfirmBattleContainer;