// this creates card class     
class Card {
    constructor(suit, name, value) {
    this.name = name;
    this.suit = suit;
    this.value = value;
    }
}

// this creates and defines the deck of cards with 52 cards     

class Deck {
    constructor() {
        this.cards = [];
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        this.values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }

createDeck() {                                                                          // This method initializes and creates a new deck with 52 cards
    console.log('Creates a new Deck');
    for (let i = 0; i < this.suits.length; i++) {                                           // this first loop will iterate thru all the suits
        for (let n = 0; n < this.names.length; n++) {                                       // this loop will iterate thru names and the values of the cards
            this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]));         // this pushes the card objects to the empty cards array
        }
    }
}

shuffleDeck() {
    //This will shuffle the deck of cards
    console.log('Shuffles Cards');
    const shuffleDeck = [];
    for (let i = 0; i < 52; i++) {
        let randomPosition = Math.floor((this.cards.length - 1) * Math.random());
        let randomItem = this.cards.splice(randomPosition, 1);
        shuffleDeck.push(...randomItem);
    }
    return shuffleDeck;
}

dealDeck(players) {
        //This will deal cards to the players
        while (this.cards.length > 0) {
            players.forEach(player => {
                player.hands.push(this.cards.pop());                                                // and this will push the final half of shuffled cards to player 2
            });
        }
    }
}

// show who your players are for the game   
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hands = [];
    }
}

class Game {
    constructor(){
        this.players = [];
    }

    start() {
        // create players and assign them a name
        this.players.push(new Player('Peter'));
        this.players.push(new Player('Paul'));
        console.log('DECLARE WAR!!!', this.players);

        //Create Deck and Card Shuffling
        let myDeck = new Deck();
        myDeck.createDeck();
        myDeck.shuffleDeck();

        // Deal cards to Players
        myDeck.dealDeck(this.players);
        //console.log(this.players);

        //Play Game method... this is the actual game play. should run until one is out of cards.
        this.playGame();

        // Determine Outcome of Game and Output game results
        this.endGame();
    }

    playGame() {
        console.log('DECLARE WAR');
        let player1 = this.players[0];
        let player2 = this.players[1];
        let round = 0;
        //console log... taking turns for player 1 and 2
        // loop will run until player runs out of cards. each iteration will pop the last card from each players array of cards and compare the values of the cards and determine the winner
        while (player1.hands.length > 0 && player2.hands.length > 0) {
            let player1Card = player1.hands.pop();
            let player2Card = player2.hands.pop();

            console.log('Round: ', ++round, '\nPlayer 1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit);

            if (player1Card.value > player2Card.value) {
                player1.points += 1;
            } else if (player2Card.value > player1Card.value) {
                player2.points += 1;
            }

        }
    }

    endGame() {
        // this will end game and announce the winner of the game!
        let player1 = this.players[0];
        let player2 = this.players[1];

        // this if statement compares the points for each player to determine who won and console log the winner
        if (player1.points > player2.points) {
            console.log('Game Over! ' + player1.name + ' Won the game!\nFINAL SCORES:\n' + player1.name + ': ' + player1.points + '\n' + player2.name + ': ' + player2.points + '\nThanks for Playing!');
        } else if (player2.points > player1.points) {
            console.log('Game Over! ' + player2.name + ' Won the game!\nFINAL SCORES:\n' + player1.name + ': ' + player1.points + '\n' + player2.name + ': ' + player2.points + '\nThanks for Playing!');
        } else {
            console.log('GAME OVER! \nTIED GAME\nFINAL SCORES:\n' + player1.name + ': ' + player1.points + '\n' + player2.name + ': ' + player2.points + '\nThanks for Playing!');
        }
    }
}

let game = new Game();
game.start();