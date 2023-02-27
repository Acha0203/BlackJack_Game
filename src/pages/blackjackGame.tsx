import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import DealerArea from '@/components/DealerArea';
import PlayerArea from '@/components/PlayerArea';
import DoubleButton from '@/components/ui/buttons/DoubleButton';
import HitButton from '@/components/ui/buttons/HitButton';
import ResultLogButton from '@/components/ui/buttons/ResultLogButton';
import StandButton from '@/components/ui/buttons/StandButton';
import SurrenderButton from '@/components/ui/buttons/SurrenderButton';
import BettingWindow from '@/components/ui/window/BettingWindow';
import GameOverWindow from '@/components/ui/window/GameOverWindow';
import NextRoundWindow from '@/components/ui/window/NextRoundWindow';
import ResultLogWindow from '@/components/ui/window/ResultLogWindow';
import { Table } from '@/model';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const BlackjackGame = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  const gameType = useSelector((state: BlackjackState) => state.blackjack.gameType);
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const userGameStatus = useSelector((state: BlackjackState) => state.blackjack.userGameStatus);
  const ai1GameStatus = useSelector((state: BlackjackState) => state.blackjack.ai1GameStatus);
  const ai2GameStatus = useSelector((state: BlackjackState) => state.blackjack.ai2GameStatus);
  const showResultLogWindow = useSelector(
    (state: BlackjackState) => state.blackjack.showResultLogWindow,
  );
  const [showBettingWindow, setShowBettingWindow] = useState(false);
  const [showNextRoundWindow, setShowNextRoundWindow] = useState(false);
  const [showGameOverWindow, setShowGameOverWindow] = useState(false);
  const table = useMemo(() => new Table(gameType), [gameType]);

  const updateUser = useCallback(() => {
    dispatch(blackjackActions.setUserHand(JSON.parse(JSON.stringify(table.players[0].hand))));
    dispatch(blackjackActions.setUserHandScore(table.players[0].getHandScore()));
    dispatch(blackjackActions.setUserGameStatus(table.players[0].gameStatus));
  }, [dispatch, table.players]);

  const updateAi1 = useCallback(() => {
    dispatch(blackjackActions.setAi1Hand(JSON.parse(JSON.stringify(table.players[1].hand))));
    dispatch(blackjackActions.setAi1HandScore(table.players[1].getHandScore()));
    dispatch(blackjackActions.setAi1GameStatus(table.players[1].gameStatus));
  }, [dispatch, table.players]);

  const updateAi2 = useCallback(() => {
    dispatch(blackjackActions.setAi2Hand(JSON.parse(JSON.stringify(table.players[2].hand))));
    dispatch(blackjackActions.setAi2HandScore(table.players[2].getHandScore()));
    dispatch(blackjackActions.setAi2GameStatus(table.players[2].gameStatus));
  }, [dispatch, table.players]);

  const updateHouse = useCallback(() => {
    dispatch(blackjackActions.setHouseHand(JSON.parse(JSON.stringify(table.house.hand))));
    dispatch(blackjackActions.setHouseHandScore(table.house.getHandScore()));
    dispatch(blackjackActions.setHouseGameStatus(table.house.gameStatus));
  }, [dispatch, table.house]);

  // BettingWindowを表示する
  const promptUser = useCallback(() => {
    dispatch(blackjackActions.setChips(table.players[0].chips));
    dispatch(blackjackActions.setBet(0));
    setShowBettingWindow(true);
  }, [dispatch, table.players]);

  const gameStart = useCallback(() => {
    table.players[0].name = userName;
    updateUser();
    updateAi1();
    updateAi2();
    updateHouse();
    table.deck.resetDeck();
    promptUser();
  }, [
    promptUser,
    table.deck,
    table.players,
    updateAi1,
    updateAi2,
    updateHouse,
    updateUser,
    userName,
  ]);

  const handleClickOK = () => {
    table.players[0].bet = bet;
    table.turnCounter++;
    table.players[0].gameStatus = 'waiting';
    dispatch(blackjackActions.setUserGameStatus('waiting'));
    setShowBettingWindow(false);

    while (table.gamePhase === 'betting') {
      table.haveTurn(0);
    }

    // カードを配る処理
    table.blackjackAssignPlayerHands();
    updateUser();
    updateAi1();
    updateAi2();
    updateHouse();

    // カードを1枚ずつ開く処理
    loopHaveTurnWhileAiAction();
  };

  // カードを1枚ずつ開く処理
  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // AIのアクション
  const loopHaveTurnWhileAiAction = async () => {
    while (!table.allPlayerActionsResolved()) {
      table.haveTurn(0);
      await sleep(1500);
      updateAi1();
      updateAi2();
    }
  };

  const getRoundResults = useCallback(async () => {
    await sleep(1000);
    dispatch(blackjackActions.setWinAmount(table.players[0].winAmount));
    dispatch(blackjackActions.setRoundResults(table.resultsLog));
    updateHouse();
    updateAi1();
    updateAi2();
    updateUser();
    table.players[0].chips > 0 ? setShowNextRoundWindow(true) : setShowGameOverWindow(true);
  }, [dispatch, table, updateAi1, updateAi2, updateHouse, updateUser]);

  // 勝者決定
  const loopHaveTurnWhileEvaluatingWinners = useCallback(async () => {
    while (table.gamePhase !== 'roundOver') {
      table.haveTurn(0);
      await sleep(1500);
      updateHouse();
    }
    updateAi1();
    updateAi2();
    updateUser();
    getRoundResults();
  }, [getRoundResults, table, updateAi1, updateAi2, updateHouse, updateUser]);

  const hit = () => {
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'hit';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const stand = () => {
    // すべてのボタンをdisabledにする
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'stand';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const surrender = () => {
    // すべてのボタンをdisabledにする
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'surrender';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const double = () => {
    // すべてのボタンをdisabledにする
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'double';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const openHouseHand = useCallback(() => {
    table.house.gameStatus = 'acting';
    dispatch(blackjackActions.setHouseGameStatus('acting'));
    loopHaveTurnWhileEvaluatingWinners();
  }, [dispatch, loopHaveTurnWhileEvaluatingWinners, table.house]);

  // すべてのプレイヤーがアクションを完了しているかどうか
  const allPlayerActionsResolved = useCallback((): boolean => {
    return (
      (ai1GameStatus === 'stand' ||
        ai1GameStatus === 'bust' ||
        ai1GameStatus === 'double' ||
        ai1GameStatus === 'surrender' ||
        ai1GameStatus === 'broken') &&
      (ai2GameStatus === 'stand' ||
        ai2GameStatus === 'bust' ||
        ai2GameStatus === 'double' ||
        ai2GameStatus === 'surrender' ||
        ai2GameStatus === 'broken') &&
      (userGameStatus === 'stand' ||
        userGameStatus === 'bust' ||
        userGameStatus === 'double' ||
        userGameStatus === 'surrender')
    );
  }, [ai1GameStatus, ai2GameStatus, userGameStatus]);

  const startNextRound = () => {
    setShowNextRoundWindow(false);
    table.blackjackClearPlayerHandsAndBets();
    dispatch(blackjackActions.setUnableSurrender(false));
    dispatch(blackjackActions.setUnableStand(false));
    dispatch(blackjackActions.setUnableHit(false));
    dispatch(blackjackActions.setUnableDouble(false));
    updateUser();
    updateAi1();
    updateAi2();
    updateHouse();
    promptUser();
  };

  const startNewGame = () => {
    setShowGameOverWindow(false);
    dispatch(blackjackActions.setUnableSurrender(false));
    dispatch(blackjackActions.setUnableStand(false));
    dispatch(blackjackActions.setUnableHit(false));
    dispatch(blackjackActions.setUnableDouble(false));
  };

  useEffect(() => {
    // bustならすべてのボタンをdisabledにする
    if (userGameStatus === 'bust') {
      dispatch(blackjackActions.setUnableSurrender(true));
      dispatch(blackjackActions.setUnableStand(true));
      dispatch(blackjackActions.setUnableHit(true));
      dispatch(blackjackActions.setUnableDouble(true));
    }
  }, [dispatch, userGameStatus]);

  useEffect(() => {
    gameStart();
  }, [gameStart]);

  useEffect(() => {
    if (allPlayerActionsResolved()) {
      openHouseHand();
    }
  }, [allPlayerActionsResolved, openHouseHand]);

  return (
    <div>
      <div className={styles.bj_table_bg}>
        <ResultLogButton />
        <DealerArea house={table.house} />
        <div className='flex justify-center items-start'>
          <PlayerArea player={table.players[1]} />
          <PlayerArea player={table.players[0]} />
          <PlayerArea player={table.players[2]} />
        </div>
        <div className='flex justify-center items-start pt-3 bg-black w-full h-1/5'>
          <SurrenderButton onClick={() => surrender()} />
          <StandButton onClick={() => stand()} />
          <HitButton onClick={() => hit()} />
          <DoubleButton onClick={() => double()} />
        </div>
      </div>
      {showBettingWindow && (
        <div className={styles.overlay}>
          <BettingWindow
            onClick={() => handleClickOK()}
            betDenominations={table.betDenominations}
          />
        </div>
      )}
      {showNextRoundWindow && (
        <div className={styles.overlay}>
          <NextRoundWindow onClick={() => startNextRound()} />
        </div>
      )}
      {showGameOverWindow && (
        <div className={styles.overlay}>
          <Link href={'/'}>
            <GameOverWindow onClick={() => startNewGame()} />
          </Link>
        </div>
      )}
      {showResultLogWindow && (
        <div className={styles.overlay}>
          <ResultLogWindow />
        </div>
      )}
    </div>
  );
};

export default BlackjackGame;
