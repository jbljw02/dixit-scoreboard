import { ScoreBoardProps } from '../../../types/dixit.type';
import CommonButton from '../../common/CommonButton';
import PlayerColumn from './PlayerColumn';
import RoundColumn from './RoundColumn';
import useRounds from '../../../hooks/useRounds';

export default function ScoreBoard({ players, onUpdateScore, isGameStarted }: ScoreBoardProps) {
  const { rounds, addNewRound } = useRounds({ players, isGameStarted });
  return (
    <div className="flex-1 mb-6 bg-white rounded-lg shadow-md">
      <div className="flex w-full">
        {/* 왼쪽 고정 열(플레이어) */}
        <PlayerColumn players={players} isGameStarted={isGameStarted} />
        {/* 각 라운드당 점수 표시 */}
        {
          isGameStarted && (
            <RoundColumn
              players={players}
              rounds={rounds}
              onUpdateScore={onUpdateScore} />
          )
        }
      </div>
      {/* 라운드 추가 버튼 */}
      {
        isGameStarted && (
          <div className="p-4 flex justify-end">
            <CommonButton onClick={addNewRound} type="button">
              라운드 추가
            </CommonButton>
          </div>
        )
      }
    </div>
  );
}