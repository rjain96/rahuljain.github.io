// Generated by CoffeeScript 1.10.0
(function() {
  var PepperGame, Player, Team, bid_symbols, f_dur, suit_symbols,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function($) {})(jQuery);

  f_dur = 400;

  bid_symbols = {
    4: '4',
    5: '5',
    6: '6',
    7: '&#x1F319;',
    14: '&#x1F319;&#x1F319;'
  };

  suit_symbols = {
    'clubs': '<span>&#9827;</span>',
    'diamonds': '<span style="color: red;">&#9830;</span>',
    'spades': '<span>&#9824;</span>',
    'hearts': '<span style="color: red;">&#9829;</span>',
    'no trump': '<span>&#8709;</span>'
  };

  Team = (function() {
    function Team(player11, player21) {
      var i, len, player, ref;
      this.player1 = player11;
      this.player2 = player21;
      this.name = '';
      this.scores = [0];
      this.players = [this.player1, this.player2];
      ref = this.players;
      for (i = 0, len = ref.length; i < len; i++) {
        player = ref[i];
        player.setTeam(this);
      }
    }

    Team.prototype.updatePoints = function(newPoints) {
      return this.scores.push(this.score() + newPoints);
    };

    Team.prototype.score = function() {
      return this.scores[this.scores.length - 1];
    };

    Team.prototype.setName = function(newName) {
      return this.name = newName;
    };

    Team.prototype.victorious = function(otherTeam) {
      return (this.score() > otherTeam.score()) && (this.score() >= 42);
    };

    Team.prototype.resetScore = function() {
      return this.scores = [0];
    };

    return Team;

  })();

  Player = (function() {
    function Player(name) {
      this.name = name;
      this.teamAffil = null;
    }

    Player.prototype.setTeam = function(newTeam) {
      return this.teamAffil = newTeam;
    };

    Player.prototype.setName = function(newName) {
      return this.name = newName;
    };

    return Player;

  })();

  PepperGame = (function() {
    function PepperGame(team11, team21) {
      this.team1 = team11;
      this.team2 = team21;
      this.i = 0;
      this.biddingTeams = [];
      this.defendingTeams = [];
      this.bidders = [];
      this.suits = [];
      this.bids = [];
      this.passPlays = [];
      this.players = [this.team1.players[0], this.team2.players[0], this.team1.players[1], this.team2.players[1]];
      this.teams = [this.team1, this.team2];
    }

    PepperGame.prototype.biddingTeam = function() {
      return this.biddingTeams[this.biddingTeams.length - 1];
    };

    PepperGame.prototype.defendingTeam = function() {
      return this.defendingTeams[this.defendingTeams.length - 1];
    };

    PepperGame.prototype.bidder = function() {
      return this.bidders[this.bidders.length - 1];
    };

    PepperGame.prototype.suit = function() {
      return this.suits[this.suits.length - 1];
    };

    PepperGame.prototype.bid = function() {
      return this.bids[this.bids.length - 1];
    };

    PepperGame.prototype.passPlay = function() {
      return this.passPlays[this.passPlays.length - 1];
    };

    PepperGame.prototype.setBidder = function(newBidder) {
      return this.bidders.push(newBidder);
    };

    PepperGame.prototype.setBid = function(newBid) {
      return this.bids.push(newBid);
    };

    PepperGame.prototype.setTeams = function() {
      var i, len, ref, ref1, results, team;
      ref = this.teams;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        team = ref[i];
        if (ref1 = this.bidder(), indexOf.call(team.players, ref1) >= 0) {
          results.push(this.biddingTeams.push(team));
        } else {
          results.push(this.defendingTeams.push(team));
        }
      }
      return results;
    };

    PepperGame.prototype.setSuit = function(newSuit) {
      return this.suits.push(newSuit);
    };

    PepperGame.prototype.setPassPlay = function(newPassPlay) {
      return this.passPlays.push(newPassPlay);
    };

    PepperGame.prototype.passRound = function() {
      this.setBidder('Pass');
      this.biddingTeams.push('pass');
      this.defendingTeams.push('pass');
      this.setBid('pass');
      this.setSuit('pass');
      return this.setPassPlay('pass');
    };

    PepperGame.prototype.getBidder = function() {
      var dealer;
      dealer = this.players[this.i % 4];
      $('.instruct').text(dealer.name + " deals. Who won the bid?");
      $('.instruct').fadeIn();
      return $('.btn-player').fadeIn();
    };

    PepperGame.prototype.getBid = function() {
      $('.instruct').text("Okay, what did " + (this.bidder().name) + " bid?");
      $('.instruct').fadeIn();
      return $('.btn-bid').fadeIn();
    };

    PepperGame.prototype.getSuit = function() {
      $('.instruct').text("What suit is " + (this.bidder().name) + "'s bid in?");
      $('.instruct').fadeIn();
      return $('.btn-suit').fadeIn();
    };

    PepperGame.prototype.getDecision = function() {
      if (this.suit() === 'clubs') {
        this.setPassPlay('play');
        return this.getOutcome();
      } else {
        $('.instruct').html(((this.bidder().name) + " has bid ") + (bid_symbols[this.bid()] + " in " + suit_symbols[this.suit()] + ". What will ") + ((this.defendingTeam().name) + " do?"));
        $('.instruct').fadeIn();
        if (this.bid() === 4) {
          return $('.btn-decision4').fadeIn();
        } else if (this.bid() === 5) {
          return $('.btn-decision5').fadeIn();
        } else {
          return $('.btn-decision-other').fadeIn();
        }
      }
    };

    PepperGame.prototype.getOutcome = function() {
      if (this.suit() === 'clubs') {
        $('.instruct').html(("Too bad for " + (this.defendingTeam().name) + ", they're ") + ("playing because " + (this.bidder().name) + " has bid " + bid_symbols[this.bid()] + " in ") + (suit_symbols[this.suit()] + ". How many tricks did they get?"));
        $('.instruct').fadeIn();
      } else {
        $('.instruct').html(((this.bidder().name) + " has bid " + bid_symbols[this.bid()] + " ") + ("in " + suit_symbols[this.suit()] + " and " + (this.defendingTeam().name) + " is playing. ") + "How many tricks did they get?");
        $('.instruct').fadeIn();
      }
      return $('.btn-tricks').fadeIn();
    };

    PepperGame.prototype.startPepperHand = function() {
      var dealer;
      this.setBidder(this.players[(this.i + 1) % 4]);
      this.setTeams();
      this.setBid(4);
      dealer = this.players[this.i].name;
      $('.instruct').text((dealer + " deals, and " + (this.bidder().name) + " ") + ("automatically bids " + (this.bid()) + ". What suit is it in?"));
      $('.instruct').fadeIn();
      return $('.btn-suit').fadeIn();
    };

    PepperGame.prototype.startRegularHand = function() {
      var dealer;
      dealer = this.players[this.i % 4].name;
      $('.instruct').text(dealer + " deals. Who won the bid?");
      $('.instruct').fadeIn();
      return $('.btn-player').fadeIn();
    };

    PepperGame.prototype.defChange = function(defenseTricks, theyStayed) {
      if (defenseTricks > 0) {
        if (this.bid() > 6) {
          return this.bid();
        } else {
          return defenseTricks;
        }
      } else {
        if (theyStayed) {
          return -this.bid();
        } else {
          return 0;
        }
      }
    };

    PepperGame.prototype.bidChange = function(defenseTricks) {
      var tricksAvailable;
      if (this.bid() < 7) {
        tricksAvailable = 6 - this.bid();
      } else {
        tricksAvailable = 0;
      }
      if (defenseTricks <= tricksAvailable) {
        return this.bid();
      } else {
        return -this.bid();
      }
    };

    PepperGame.prototype.updateScores = function(bidder, bid, suit, team1Change, team2Change) {
      var bidString, dealer, partialSet, pepper, score_1, score_2, team1ScoreString, team2ScoreString, wasSet;
      this.team1.updatePoints(team1Change);
      this.team2.updatePoints(team2Change);
      dealer = this.players[this.i % 4];
      pepper = false;
      if (this.i < 4) {
        pepper = true;
      }
      partialSet = false;
      wasSet = false;
      if (team1Change < 0) {
        team1ScoreString = "<span style='color:red;'>" + (this.team1.score()) + "</span>";
        if (this.team1 === this.defendingTeam()) {
          if (this.suit() === 'clubs') {
            partialSet = true;
          } else {
            wasSet = true;
          }
        } else {
          if (pepper) {
            partialSet = true;
          } else {
            wasSet = true;
          }
        }
      } else {
        team1ScoreString = "<span>" + (this.team1.score()) + "</span>";
      }
      if (team2Change < 0) {
        team2ScoreString = "<span style='color:red;'>" + (this.team2.score()) + "</span>";
        if (this.team2 === this.defendingTeam()) {
          if (this.suit() === 'clubs') {
            partialSet = true;
          } else {
            wasSet = true;
          }
        } else {
          if (pepper) {
            partialSet = true;
          } else {
            wasSet = true;
          }
        }
      } else {
        team2ScoreString = "<span>" + (this.team2.score()) + "</span>";
      }
      bid = bid_symbols[bid];
      if (bidder === "Pass") {
        bidString = "" + bidder;
      } else {
        bidString = bidder + "-" + bid + suit;
      }
      $('#score tr:last').after(("<tr><td>" + (this.i + 1) + "</td><td>" + dealer.name + "</td>") + ("<td>" + team1ScoreString + "</td>") + ("<td>" + team2ScoreString + "</td><td>" + bidString + "</td></tr>"));
      if (wasSet) {
        $('#score tr:last').addClass('danger');
      }
      if (partialSet) {
        $('#score tr:last').addClass('warning');
      }
      if (this.passPlay() === 'pass') {
        $('#score tr:last').addClass('success');
      }
      score_1 = "" + (this.team1.score());
      score_2 = "" + (this.team2.score());
      $('#team1-score').fadeOut(f_dur / 2.0, function() {
        return $('#team2-score').fadeOut(f_dur / 2.0, function() {
          $('#team1-score').text(score_1);
          $('#team2-score').text(score_2);
          return $('#team1-score').fadeIn(f_dur / 2.0, function() {
            return $('#team2-score').fadeIn(f_dur / 2.0);
          });
        });
      });
      if (this.team1.victorious(this.team2)) {
        return this.triggerVictory(this.team1);
      } else if (this.team2.victorious(this.team1)) {
        return this.triggerVictory(this.team2);
      } else {
        this.i += 1;
        dealer = this.players[this.i % 4].name;
        if (this.i < 4) {
          return this.startPepperHand();
        } else {
          return this.startRegularHand();
        }
      }
    };

    PepperGame.prototype.triggerVictory = function(team) {
      $('.instruct').text(team.name + " has won the game!");
      $('.instruct').fadeIn();
      return $('#btn-restart').fadeIn();
    };

    PepperGame.prototype.restart = function() {
      var i, len, ref, score_1, score_2, team;
      this.i = 0;
      this.biddingTeams = [];
      this.defendingTeams = [];
      this.bidders = [];
      this.suits = [];
      this.bids = [];
      ref = this.teams;
      for (i = 0, len = ref.length; i < len; i++) {
        team = ref[i];
        team.resetScore();
      }
      score_1 = "" + (this.team1.score());
      score_2 = "" + (this.team2.score());
      $('#score').html("<tr><th>Hand</th><th>Dealer</th>" + ("<th>" + this.team1.name + "</th><th>" + this.team2.name + "</th><th>Bid</th></tr>"));
      $('#team1-score').fadeOut(f_dur / 2.0, function() {
        return $('#team2-score').fadeOut(f_dur / 2.0, function() {
          $('#team1-score').text(score_1);
          $('#team2-score').text(score_2);
          return $('#team1-score').fadeIn(f_dur / 2.0, function() {
            return $('#team2-score').fadeIn(f_dur / 2.0);
          });
        });
      });
      return this.startPepperHand();
    };

    PepperGame.prototype.revertToOutcome = function() {
      var score_1, score_2;
      this.i -= 1;
      this.team1.scores.pop();
      this.team2.scores.pop();
      $('#score tr:last').fadeOut(f_dur);
      $('#score tr:last').remove();
      score_1 = "" + (this.team1.score());
      score_2 = "" + (this.team2.score());
      $('#team1-score').fadeOut(f_dur / 2.0, function() {
        return $('#team2-score').fadeOut(f_dur / 2.0, function() {
          $('#team1-score').text(score_1);
          $('#team2-score').text(score_2);
          return $('#team1-score').fadeIn(f_dur / 2.0, function() {
            return $('#team2-score').fadeIn(f_dur / 2.0);
          });
        });
      });
      if (this.bidder() === 'Pass') {
        this.biddingTeams.pop();
        this.defendingTeams.pop();
        this.bidders.pop();
        this.suits.pop();
        this.bids.pop();
        return this.getBidder();
      } else {
        if (this.passPlay() === 'play') {
          return this.getOutcome();
        } else {
          return this.revertToDecision();
        }
      }
    };

    PepperGame.prototype.revertToPlayer = function() {
      this.bidders.pop();
      return this.getBidder();
    };

    PepperGame.prototype.revertToBid = function() {
      this.bid.pop();
      this.defendingTeams.pop();
      this.biddingTeams.pop();
      return this.getBid();
    };

    PepperGame.prototype.revertToSuit = function() {
      this.suits.pop();
      return this.getSuit();
    };

    PepperGame.prototype.revertToDecision = function() {
      this.passPlays.pop();
      return this.getDecision();
    };

    return PepperGame;

  })();

  $(document).ready(function() {
    var game, player1, player2, player3, player4, team1, team2;
    player1 = new Player('player1');
    player2 = new Player('player2');
    player3 = new Player('player3');
    player4 = new Player('player4');
    team1 = new Team(player1, player3);
    team2 = new Team(player2, player4);
    game = new PepperGame(team1, team2);
    $('#player-1-name').focus();
    $(".names form input").keypress(function(e) {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        $('#name-submit').click();
        return false;
      } else {
        return true;
      }
    });
    $('#name-submit').click(function() {
      player1.setName($('#player-1-name').val());
      player2.setName($('#player-2-name').val());
      player3.setName($('#player-3-name').val());
      player4.setName($('#player-4-name').val());
      $('#team-1-prompt').text(player1.name + " and " + player3.name + "'s team");
      $('#team-2-prompt').text(player2.name + " and " + player4.name + "'s team");
      $('#player-1').text(player1.name);
      $('#player-2').text(player2.name);
      $('#player-3').text(player3.name);
      $('#player-4').text(player4.name);
      return $('.names').fadeOut(function() {
        return $('.teams').fadeIn(function() {
          return $('#team-1-name').focus();
        });
      });
    });
    $(".teams form input").keypress(function(e) {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        $('#team-submit').click();
        return false;
      } else {
        return true;
      }
    });
    $('#team-submit').click(function() {
      team1.setName($('#team-1-name').val());
      team2.setName($('#team-2-name').val());
      $('.team-1').text(team1.name);
      $('.team-2').text(team2.name);
      $('.teams').fadeOut(f_dur, function() {
        return $('.game').fadeIn();
      });
      return game.startPepperHand();
    });
    $('#btn-restart').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('#btn-restart').fadeOut(f_dur, function() {
        return game.restart();
      });
    });
    $('#player-1').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        game.setBidder(player1);
        game.setTeams();
        return game.getBid();
      });
    });
    $('#player-2').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        game.setBidder(player2);
        game.setTeams();
        return game.getBid();
      });
    });
    $('#player-3').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        game.setBidder(player3);
        game.setTeams();
        return game.getBid();
      });
    });
    $('#player-4').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        game.setBidder(player4);
        game.setTeams();
        return game.getBid();
      });
    });
    $('#player-no').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        game.passRound();
        return game.updateScores('Pass', '', '', 0, 0);
      });
    });
    $('#bid-4').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        game.setBid(4);
        return game.getSuit();
      });
    });
    $('#bid-5').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        game.setBid(5);
        return game.getSuit();
      });
    });
    $('#bid-6').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        game.setBid(6);
        return game.getSuit();
      });
    });
    $('#bid-7').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        game.setBid(7);
        return game.getSuit();
      });
    });
    $('#bid-14').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        game.setBid(14);
        return game.getSuit();
      });
    });
    $('#clubs').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        game.setSuit('clubs');
        return game.getDecision();
      });
    });
    $('#diamonds').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        game.setSuit('diamonds');
        return game.getDecision();
      });
    });
    $('#spades').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        game.setSuit('spades');
        return game.getDecision();
      });
    });
    $('#hearts').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        game.setSuit('hearts');
        return game.getDecision();
      });
    });
    $('#no-trump').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        game.setSuit('no trump');
        return game.getDecision();
      });
    });
    $('.pass').click(function() {
      var bid, cls, team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(0, false);
        team2Change = game.bidChange(0);
      } else {
        team2Change = game.defChange(0, false);
        team1Change = game.bidChange(0);
      }
      bid = game.bid();
      if (bid === 4) {
        cls = '.btn-decision4';
      } else if (bid === 5) {
        cls = '.btn-decision5';
      } else {
        cls = '.btn-decision-other';
      }
      game.setPassPlay('pass');
      $('.instruct').fadeOut(f_dur);
      return $(cls).fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('.pass1').click(function() {
      var bid, cls, team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(1, false);
        team2Change = game.bidChange(1);
      } else {
        team2Change = game.defChange(1, false);
        team1Change = game.bidChange(1);
      }
      bid = game.bid();
      if (bid === 4) {
        cls = '.btn-decision4';
      } else if (bid === 5) {
        cls = '.btn-decision5';
      } else {
        cls = '.btn-decision-other';
      }
      game.setPassPlay('pass');
      $('.instruct').fadeOut(f_dur);
      return $(cls).fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('.pass2').click(function() {
      var bid, cls, team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(2, false);
        team2Change = game.bidChange(2);
      } else {
        team2Change = game.defChange(2, false);
        team1Change = game.bidChange(2);
      }
      bid = game.bid();
      if (bid === 4) {
        cls = '.btn-decision4';
      } else if (bid === 5) {
        cls = '.btn-decision5';
      } else {
        cls = '.btn-decision-other';
      }
      game.setPassPlay('pass');
      $('.instruct').fadeOut(f_dur);
      return $(cls).fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('.play').click(function() {
      var bid, cls;
      bid = game.bid();
      if (bid === 4) {
        cls = '.btn-decision4';
      } else if (bid === 5) {
        cls = '.btn-decision5';
      } else {
        cls = '.btn-decision-other';
      }
      game.setPassPlay('play');
      $('.instruct').fadeOut(f_dur);
      return $(cls).fadeOut(f_dur, function() {
        return game.getOutcome();
      });
    });
    $('#0-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(0, true);
        team2Change = game.bidChange(0);
      } else {
        team2Change = game.defChange(0, true);
        team1Change = game.bidChange(0);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#1-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(1, true);
        team2Change = game.bidChange(1);
      } else {
        team2Change = game.defChange(1, true);
        team1Change = game.bidChange(1);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#2-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(2, true);
        team2Change = game.bidChange(2);
      } else {
        team2Change = game.defChange(2, true);
        team1Change = game.bidChange(2);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#3-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(3, true);
        team2Change = game.bidChange(3);
      } else {
        team2Change = game.defChange(3, true);
        team1Change = game.bidChange(3);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#4-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(4, true);
        team2Change = game.bidChange(4);
      } else {
        team2Change = game.defChange(4, true);
        team1Change = game.bidChange(4);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#5-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(5, true);
        team2Change = game.bidChange(5);
      } else {
        team2Change = game.defChange(5, true);
        team1Change = game.bidChange(5);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('#6-tricks').click(function() {
      var team1Change, team2Change;
      if (game.team1 === game.defendingTeam()) {
        team1Change = game.defChange(6, true);
        team2Change = game.bidChange(6);
      } else {
        team2Change = game.defChange(6, true);
        team1Change = game.bidChange(6);
      }
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        return game.updateScores(game.bidder().name, game.bid(), suit_symbols[game.suit()], team1Change, team2Change);
      });
    });
    $('.btn-player .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-player').fadeOut(f_dur, function() {
        return game.revertToOutcome();
      });
    });
    $('.btn-bid .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-bid').fadeOut(f_dur, function() {
        return game.revertToPlayer();
      });
    });
    $('.btn-suit .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-suit').fadeOut(f_dur, function() {
        if (game.i < 4) {
          if (game.i === 0) {
            return $('.game').fadeOut(f_dur, function() {
              return $('.teams').fadeIn(f_dur);
            });
          } else {
            game.bidders.pop();
            game.defendingTeams.pop();
            game.biddingTeams.pop();
            game.bids.pop();
            return game.revertToOutcome();
          }
        } else {
          return game.revertToBid();
        }
      });
    });
    $('.btn-decision4 .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-decision4').fadeOut(f_dur, function() {
        return game.revertToSuit();
      });
    });
    $('.btn-decision5 .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-decision5').fadeOut(f_dur, function() {
        return game.revertToSuit();
      });
    });
    $('.btn-decision-other .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-decision-other').fadeOut(f_dur, function() {
        return game.revertToSuit();
      });
    });
    return $('.btn-tricks .btn-back').click(function() {
      $('.instruct').fadeOut(f_dur);
      return $('.btn-tricks').fadeOut(f_dur, function() {
        if (game.suit() === 'clubs') {
          game.passPlays.pop();
          return game.revertToSuit();
        } else {
          return game.revertToDecision();
        }
      });
    });
  });

}).call(this);