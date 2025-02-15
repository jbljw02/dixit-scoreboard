import useScoreCell from '../../../hooks/dixit/useScoreCell';
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
            <input
              type="number"
              value={editingScore}
              onChange={cellScoreChange}
              onKeyDown={keyDownEvent}
              onBlur={cellScoreSubmit}
              // [appearance:textfield]: input을 일반 텍스트 필드처럼 만들어서 숫자 잘림 방지
              className="w-[30px] h-[30px] text-center border border-orange-200 
                rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400
                [appearance:textfield]"
              autoFocus={true} />
            {
              errorMessage && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1
                  bg-red-200 text-red-600 text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                  {errorMessage}
                </div>
              )
            }
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