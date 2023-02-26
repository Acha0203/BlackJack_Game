import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import DealerArea from '@/components/DealerArea';
import PlayerArea from '@/components/PlayerArea';
import BettingWindow from '@/components/ui/BettingWindow';
import DoubleButton from '@/components/ui/buttons/DoubleButton';
import HitButton from '@/components/ui/buttons/HitButton';
import StandButton from '@/components/ui/buttons/StandButton';
import SurrenderButton from '@/components/ui/buttons/SurrenderButton';
import { Player, Table } from '@/model';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const BlackjackGame = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  const gameType = useSelector((state: BlackjackState) => state.blackjack.gameType);
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const userGameStatus = useSelector((state: BlackjackState) => state.blackjack.userGameStatus);
  const [showBettingWindow, setShowBettingWindow] = useState(false);
  const table = useMemo(() => new Table(gameType), [gameType]);

  const updateUser = () => {
    dispatch(blackjackActions.setUserHand(JSON.parse(JSON.stringify(table.players[0].hand))));
    dispatch(blackjackActions.setUserHandScore(table.players[0].getHandScore()));
    setTimeout(() => {
      dispatch(blackjackActions.setUserGameStatus(table.players[0].gameStatus));
    }, 500);
  };

  const updateAi1 = () => {
    dispatch(blackjackActions.setAi1Hand(JSON.parse(JSON.stringify(table.players[1].hand))));
    dispatch(blackjackActions.setAi1HandScore(table.players[1].getHandScore()));
    setTimeout(() => {
      dispatch(blackjackActions.setAi1GameStatus(table.players[1].gameStatus));
    }, 1500);
  };

  const updateAi2 = () => {
    dispatch(blackjackActions.setAi2Hand(JSON.parse(JSON.stringify(table.players[2].hand))));
    dispatch(blackjackActions.setAi2HandScore(table.players[2].getHandScore()));
    setTimeout(() => {
      dispatch(blackjackActions.setAi2GameStatus(table.players[2].gameStatus));
    }, 1500);
  };

  const updateHouse = () => {
    dispatch(blackjackActions.setHouseHand(JSON.parse(JSON.stringify(table.house.hand))));
    dispatch(blackjackActions.setHouseHandScore(table.house.getHandScore()));
    dispatch(blackjackActions.setHouseGameStatus(table.house.gameStatus));
  };

  const promptUser = useCallback(() => {
    if (table.players[0].gameStatus === 'betting') {
      setShowBettingWindow(true);
    }
  }, [table.players]);

  const gameStart = useCallback(() => {
    table.players[0].name = userName;
    table.deck.shuffle();
    promptUser();
  }, [promptUser, table, userName]);

  const handleClick = () => {
    table.players[0].bet = bet;
    table.turnCounter++;
    table.players[0].gameStatus = 'waiting';
    setShowBettingWindow(false);

    while (table.gamePhase === 'betting') {
      table.haveTurn(0);
    }

    table.blackjackAssignPlayerHands();
    updateUser();
    updateAi1();
    updateAi2();
    updateHouse();

    // カードを1枚ずつ開く処理
    loopHaveTurn();

    console.log(table.players);
  };

  // カードを1枚ずつ開く処理
  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const loopHaveTurn = async () => {
    while (!table.allPlayerActionsResolved()) {
      table.haveTurn(0);
      await sleep(1500);
      updateAi1();
      updateAi2();
    }
  };

  const hit = () => {
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'hit';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const stand = () => {
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'stand';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const surrender = () => {
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'surrender';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  const double = () => {
    dispatch(blackjackActions.setUnableSurrender(true));
    dispatch(blackjackActions.setUnableStand(true));
    dispatch(blackjackActions.setUnableHit(true));
    dispatch(blackjackActions.setUnableDouble(true));
    table.players[0].gameStatus = 'double';
    table.evaluateMove(table.players[0]);
    updateUser();
  };

  useEffect(() => {
    gameStart();
    if (userGameStatus === 'bust') {
      dispatch(blackjackActions.setUnableSurrender(true));
      dispatch(blackjackActions.setUnableStand(true));
      dispatch(blackjackActions.setUnableHit(true));
      dispatch(blackjackActions.setUnableDouble(true));
    }
    console.log(table.players);
    console.log(table.players[0].hand);
  }, [dispatch, gameStart, table.players, userGameStatus]);

  return (
    <div>
      <div className={styles.bj_table_bg}>
        <DealerArea house={table.house} />
        <div className='flex justify-center items-start mb-4'>
          <PlayerArea player={table.players[1]} />
          <PlayerArea player={table.players[0]} />
          <PlayerArea player={table.players[2]} />
        </div>
        <div className='flex justify-center items-center bg-black w-full'>
          <SurrenderButton onClick={() => surrender()} />
          <StandButton onClick={() => stand()} />
          <HitButton onClick={() => hit()} />
          <DoubleButton onClick={() => double()} />
        </div>
      </div>
      {showBettingWindow && (
        <div className={styles.overlay}>
          <BettingWindow onClick={() => handleClick()} />
        </div>
      )}
    </div>
  );
};

export default BlackjackGame;
