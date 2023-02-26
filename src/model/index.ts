export class Card {
  suit: string;
  rank: string;
  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  getRankNumber(): number {
    if (this.rank === 'A') return 11;
    else if (this.rank === 'J' || this.rank === 'Q' || this.rank === 'K') return 10;
    else return parseInt(this.rank, 10);
  }
}

export class Deck {
  gameType: string;
  cards: Card[];

  constructor(gameType: string) {
    // このデッキが扱うゲームタイプ。{'Blackjack'}から選択。
    this.gameType = gameType;

    // カードの配列
    this.cards = [];

    // ゲームタイプによってカードを初期化する
    this.generateDeck();
  }

  generateDeck(): void {
    if (this.gameType === 'Blackjack') {
      const suits = ['♥︎', '♦', '♣', '♠'];
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
          this.cards.push(new Card(suits[i], ranks[j]));
        }
      }
    }
  }

  /*
      return null : このメソッドは、デッキの状態を更新します。
      カードがランダムな順番になるようにデッキをシャッフルします。
    */
  shuffle(): void {
    let deckSize = this.cards.length;
    for (let i = deckSize - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  /*
      String gameType : どのゲームにリセットするか
      return null : このメソッドは、デッキの状態を更新します。
    */
  resetDeck(): void {
    this.cards = [];
    this.generateDeck();
    this.shuffle();
  }

  /*
      return Card : ポップされたカードを返します。
      カード配列から先頭のカード要素をポップして返します。
    */
  drawOne(): Card | undefined {
    return this.cards.pop();
  }
}

export class Player {
  name: string;
  type: string;
  gameType: string;
  hand: Card[];
  chips: number;
  bet: number;
  winAmount: number;
  gameStatus: string;
  /*
        String name : プレイヤーの名前
        String type : プレイヤータイプ。{'ai', 'user', 'house'}から選択。
        String gameType : {'Blackjack'}から選択。プレイヤーの初期化方法を決定するために使用されます。
        ?Number chips : ゲーム開始に必要なチップ。デフォルトは400。
    */
  constructor(name: string, type: string, gameType: string, chips = 400) {
    // プレイヤーの名前
    this.name = name;

    // プレイヤーのタイプ
    this.type = type;

    // 現在のゲームタイプ
    this.gameType = gameType;

    // プレイヤーの手札
    this.hand = [];

    // プレイヤーが所持しているチップ。
    this.chips = chips;

    // 現在のラウンドでのベットしているチップ
    this.bet = 0;

    // 勝利金額。正の数にも負の数にもなります。
    this.winAmount = 0;

    // プレイヤーのゲームの状態やアクションを表します。
    // ブラックジャックの場合、最初の状態は「betting」です。
    this.gameStatus = 'betting';
  }

  /*
      ?Number userData : モデル外から渡されるパラメータ。nullになることもあります。
      Number houseCard : ハウスの表向きのカードのランク。
      return GameDecision : 状態を考慮した上で、プレイヤーが行った決定。

        このメソッドは、どのようなベットやアクションを取るべきかというプレイヤーの決定を取得します。プレイヤーのタイプ、ハンド、チップの状態を読み取り、GameDecisionを返します。パラメータにuserData使うことによって、プレイヤーが「user」の場合、このメソッドにユーザーの情報を渡すことができますし、プレイヤーが 「ai」の場合、 userDataがデフォルトとしてnullを使います。
    */

  promptPlayer(userData: number | null, houseCard: number | null): GameDecision {
    let action = '';
    const hand = this.getHandScore();

    if (this.type === 'ai') {
      if (this.gameStatus === 'betting') {
        let bet = Math.floor((Math.random() * (this.chips + 1 - 1) + 1) / 5) * 5;
        this.bet = bet < this.chips ? bet : this.chips;
        action = 'waiting';
        this.gameStatus = 'waiting';
      } else if (this.gameStatus === 'waiting' || this.gameStatus === 'hit') {
        if (this.hand.length <= 2) {
          if (houseCard === null) {
            action = 'waiting';
            this.gameStatus = 'waiting';
          } else if (hand >= 17) {
            action = 'stand';
            this.gameStatus = 'stand';
          } else if (hand === 10 || hand === 11) {
            if (this.chips >= this.bet * 2) {
              action = 'double';
              this.gameStatus = 'double';
            } else {
              action = 'hit';
              this.gameStatus = 'hit';
            }
          } else {
            action = 'hit';
            this.gameStatus = 'hit';
          }
        } else {
          if (hand <= 21 && hand >= 17) {
            action = 'stand';
            this.gameStatus = 'stand';
          } else if (hand <= 21 && hand < 17) {
            action = 'hit';
            this.gameStatus = 'hit';
          }
        }
      } else {
        console.log('gameStatus: ' + this.gameStatus);
      }
    } else if (this.type === 'house') {
      if (hand >= 17) {
        action = 'stand';
        this.gameStatus = 'stand';
      } else {
        action = 'hit';
        this.gameStatus = 'hit';
      }
    } else {
      if (userData !== null) {
        action = this.gameStatus;
      }
    }

    return new GameDecision(action, this.bet);
  }

  /*
      return Number : 手札の合計
      合計が21を超える場合、手札の各エースについて、合計が21以下になるまで10を引きます。
    */
  getHandScore(): number {
    let handScore = 0;
    let numbersOfAces = 0;

    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].rank === 'A') numbersOfAces++;
      handScore += this.hand[i].getRankNumber();
    }

    if (handScore > 21) {
      while (handScore > 21 && numbersOfAces > 0) {
        handScore -= 10;
        numbersOfAces--;
      }
    }

    return handScore;
  }
}

export class GameDecision {
  action: string;
  amount: number;
  /*
      String action : プレイヤーのアクションの選択。（ブラックジャックでは、hit、standなど。）
      Number amount : プレイヤーが選択する数値。
      これはPlayer.promptPlayer()は常にreturnする、標準化されたフォーマットです。
    */
  constructor(action: string, amount: number) {
    // アクション
    this.action = action;

    // プレイヤーが選択する数値
    this.amount = amount;
  }
}

export class Table {
  gameType: string;
  betDenominations: number[];
  deck: Deck;
  players: Player[];
  house: Player;
  turnCounter: number;
  gamePhase: string;
  resultsLog: string[];
  /*
      String gameType : {"blackjack"}から選択。
      Array betDenominations : プレイヤーが選択できるベットの単位。デフォルトは[5,20,50,100]。
      return Table : ゲームフェーズ、デッキ、プレイヤーが初期化されたテーブル
    */
  constructor(gameType: string, betDenominations = [5, 20, 50, 100]) {
    // ゲームタイプを表します。
    this.gameType = gameType;

    // プレイヤーが選択できるベットの単位。
    this.betDenominations = betDenominations;

    // テーブルのカードのデッキ
    this.deck = new Deck(this.gameType);

    // プレイしているゲームに応じて、プレイヤー、gamePhases、ハウスの表現が異なるかもしれません。
    // 今回はとりあえず3人のAIプレイヤーとハウス、「betting」フェースの始まりにコミットしましょう。
    this.players = [];

    // プレイヤーをここで初期化してください。
    this.players.push(new Player('You', 'user', this.gameType));
    this.players.push(new Player('ai1', 'ai', this.gameType));
    this.players.push(new Player('ai2', 'ai', this.gameType));

    this.house = new Player('house', 'house', this.gameType);
    this.house.gameStatus = 'waiting';
    this.turnCounter = this.players.length;
    this.gamePhase = 'betting';

    // これは各ラウンドの結果をログに記録するための文字列の配列です。
    this.resultsLog = [];
  }
  /*
        Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、GameDecisionとgameTypeに応じてPlayerの状態を更新します。
        return Null : このメソッドは、プレーヤの状態を更新するだけです。

        EX:
        プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
    */
  evaluateMove(player: Player): void {
    const houseScore = this.house.hand[0] === undefined ? null : this.house.hand[0].getRankNumber();

    let dicision =
      player.type === 'user'
        ? player.promptPlayer(0, houseScore)
        : player.promptPlayer(null, houseScore);

    switch (dicision.action) {
      case 'hit':
        let card1 = this.deck.drawOne();
        if (card1 !== undefined) {
          player.hand.push(card1);
        }
        if (player.getHandScore() > 21) {
          player.gameStatus = 'bust';
          player.chips -= player.bet;
          player.winAmount -= player.bet;
          if (player.chips < 0) {
            player.gameStatus = 'broken';
          }
        }
        return;
      case 'stand':
        return;
      case 'surrender':
        let loss = Math.floor(player.bet / 2);
        player.chips -= loss;
        player.winAmount -= loss;
        return;
      case 'double':
        player.bet *= 2;
        let card2 = this.deck.drawOne();
        if (card2 !== undefined) {
          player.hand.push(card2);
        }
        if (player.getHandScore() > 21) {
          player.gameStatus = 'bust';
          player.chips -= player.bet;
          player.winAmount -= player.bet;
          if (player.chips < 0) {
            player.gameStatus = 'broken';
          }
        }
        return;
      default:
        return;
    }
  }

  /*
      return String : 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
        NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
    */
  blackjackEvaluateAndGetRoundResults(): string {
    let roundResults = '';

    for (let i = 0; i < this.players.length; i++) {
      let amount = 0;
      roundResults += 'player' + (i + 1).toString(10);
      if (
        this.players[i].gameStatus === 'bust' ||
        this.players[i].gameStatus === 'broken' ||
        this.players[i].gameStatus === 'surrender'
      ) {
        roundResults += ' lose: ';
      } else if (this.isBlackJack(this.house)) {
        if (this.isBlackJack(this.players[i])) {
          roundResults += ' push: ';
        } else {
          roundResults += ' lose: ';
          amount =
            this.players[i].gameStatus === 'double' ? this.players[i].bet * 2 : this.players[i].bet;
          this.players[i].chips -= amount;
          this.players[i].winAmount -= amount;
        }
      } else if (
        this.house.gameStatus === 'bust' ||
        this.house.getHandScore() < this.players[i].getHandScore()
      ) {
        roundResults += ' win: ';
        if (this.isBlackJack(this.players[i])) {
          amount = Math.floor(this.players[i].bet * 1.5);
          this.players[i].chips += amount;
          this.players[i].winAmount += amount;
        } else if (this.players[i].gameStatus === 'double') {
          amount = this.players[i].bet * 2;
          this.players[i].chips += amount;
          this.players[i].winAmount += amount;
        } else {
          this.players[i].chips += this.players[i].bet;
          this.players[i].winAmount += this.players[i].bet;
        }
      } else if (this.house.getHandScore() === this.players[i].getHandScore()) {
        roundResults += ' push: ';
      } else {
        roundResults += ' lose: ';
        if (this.players[i].gameStatus === 'double') {
          amount = this.players[i].bet * 2;
          this.players[i].chips -= amount;
          this.players[i].winAmount -= amount;
        } else {
          this.players[i].chips -= this.players[i].bet;
          this.players[i].winAmount -= this.players[i].bet;
        }
      }
      roundResults += this.players[i].winAmount.toString(10) + '\n';
      if (this.players[i].chips < 0) {
        this.players[i].gameStatus = 'broken';
      }
    }

    return roundResults;
  }

  /*
        Player player
        return boolean : BlackJackならtrue、そうでないならfalseを返す。
    */
  isBlackJack(player: Player): boolean {
    return (
      player.hand.length === 2 &&
      player.getHandScore() === 21 &&
      player.hand[0].rank !== '10' &&
      player.hand[1].rank !== '10'
    );
  }

  /*
      return null : デッキから2枚のカードを手札に加えることで、全プレイヤーの状態を更新します。
      NOTE: プレイヤーのタイプが「ハウス」の場合は、別の処理を行う必要があります。
    */
  blackjackAssignPlayerHands(): void {
    for (const player of this.players) {
      while (player.hand.length < 2) {
        let card = this.deck.drawOne();
        if (card !== undefined) {
          player.hand.push(card);
        }
      }
    }

    while (this.house.hand.length < 2) {
      let card = this.deck.drawOne();
      if (card !== undefined) {
        this.house.hand.push(card);
      }
    }
  }

  /*
      return null : テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
  blackjackClearPlayerHandsAndBets(): void {
    for (const player of this.players) {
      while (player.hand.length > 0) {
        player.hand.pop();
      }
      player.bet = 0;
      player.winAmount = 0;
    }

    while (this.house.hand.length > 0) {
      this.house.hand.pop();
    }
    this.house.bet = -1;
    this.house.gameStatus = 'waiting';
  }

  /*
      return Player : 現在のプレイヤー
    */
  getTurnPlayer(): Player {
    return this.players[this.turnCounter % this.players.length];
  }

  /*
      Number userData : テーブルモデルの外部から渡されるデータです。 
      return Null : このメソッドはテーブルの状態を更新するだけで、値を返しません。
    */
  haveTurn(userData: number): void {
    let turnPlayer = this.getTurnPlayer();

    if (turnPlayer === this.players[userData]) {
      return;
    } else {
      if (turnPlayer.gameStatus === 'broken') {
        this.turnCounter++;
        return;
      }

      switch (this.gamePhase) {
        case 'betting':
          this.evaluateMove(turnPlayer);
          if (this.onLastPlayer()) {
            this.gamePhase = 'acting';
          }
          this.turnCounter++;
          return;
        case 'acting':
          this.evaluateMove(turnPlayer);
          if (this.allPlayerActionsResolved()) {
            this.gamePhase = 'evaluatingWinners';
          }
          this.turnCounter++;
          return;
        case 'evaluatingWinners':
          while (this.house.gameStatus !== 'stand' && this.house.gameStatus !== 'bust') {
            this.evaluateMove(this.house);
          }
          this.resultsLog.push(this.blackjackEvaluateAndGetRoundResults());
          this.gamePhase = 'roundOver';
          return;
        case 'roundOver':
          this.blackjackClearPlayerHandsAndBets();
          this.gamePhase = 'betting';
          return;
      }
    }
  }

  /*
        return Boolean : テーブルがプレイヤー配列の最初のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
  onFirstPlayer(): boolean {
    return this.turnCounter % this.players.length === 0;
  }

  /*
        return Boolean : テーブルがプレイヤー配列の最後のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
  onLastPlayer(): boolean {
    return this.turnCounter % this.players.length === this.players.length - 1;
  }

  /*
        全てのプレイヤーがセット{'broken', 'bust', 'stand', 'surrender'}のgameStatusを持っていればtrueを返し、持っていなければfalseを返します。
    */
  allPlayerActionsResolved(): boolean {
    let resolved = 0;

    for (let i = 0; i < this.players.length; i++) {
      if (
        this.players[i].gameStatus === 'broken' ||
        this.players[i].gameStatus === 'bust' ||
        this.players[i].gameStatus === 'stand' ||
        this.players[i].gameStatus === 'double' ||
        this.players[i].gameStatus === 'surrender'
      )
        resolved++;
    }

    return resolved === this.players.length;
  }
}
