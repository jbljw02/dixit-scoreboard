import CommonInput from '../../common/CommonInput';
import useScoreCell from '../../../hooks/useScoreCell';
import { TABLE_STYLE } from './constant/styles';

interface ScoreCellProps {
  playerId: string;
  roundIndex: number;
  currentScore: number;
}

export default function ScoreCell({
  playerId,
  roundIndex,
  currentScore,
}: ScoreCellProps) {
  const {
    editingCell,
    editingScore,
    errorMessage,
    cellClick,
    cellScoreChange,
    cellScoreSubmit,
    keyDownEvent
  } = useScoreCell();

  return (
    <td
      className={`${TABLE_STYLE.td}
        w-[45px] h-[40px] cursor-pointer hover:bg-orange-100 transition-colors`}
      onClick={() => cellClick(playerId, roundIndex, currentScore)}>
      {/* 플레이어의 점수를 수정중인지에 따라 분기 */}
      {
        editingCell?.playerId === playerId &&
          editingCell?.roundIndex === roundIndex ? (
          <div className="w-full h-full text-center">
            <CommonInput
              type="number"
              value={editingScore}
              onChange={cellScoreChange}
              onKeyDown={keyDownEvent}
              onBlur={cellScoreSubmit}
              errorText={errorMessage}
              autoFocus={true} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {currentScore}
          </div>
        )
      }
    </td>
  );
}