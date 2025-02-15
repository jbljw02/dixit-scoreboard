import useScoreCell from '../../../hooks/dixit/useScoreCell';
import CommonInput from '../../common/CommonInput';
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
    cellClick,
    cellScoreChange,
    cellScoreSubmit,
    scoreCellKeyDownEvent
  } = useScoreCell();

  return (
    <td
      // 첫 라운드는 왼쪽 테두리 삭제(겹침 방지)
      className={`${TABLE_STYLE.td}
        w-[45px] h-[40px] cursor-pointer hover:bg-orange-100 transition-colors
        ${roundIndex === 0 && 'border-l-0'}`}
      onClick={() => cellClick(playerId, roundIndex, currentScore)}>
      {/* 플레이어의 점수를 수정중인지에 따라 분기 */}
      {
        editingCell?.playerId === playerId &&
          editingCell?.roundIndex === roundIndex ? (
          <div className="flex items-center justify-center w-full h-full text-center relative">
            <CommonInput
              type="number"
              value={editingScore}
              onChange={cellScoreChange}
              onKeyDown={scoreCellKeyDownEvent}
              onBlur={cellScoreSubmit}
              className="w-[30px] h-[30px] !p-0 text-center [appearance:textfield] "
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