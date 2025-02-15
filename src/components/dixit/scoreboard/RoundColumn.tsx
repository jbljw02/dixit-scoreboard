import { useAppSelector } from '../../../store/hooks';
import { TABLE_STYLE } from './constant/styles';
import ScoreCell from './ScoreCell';

export default function RoundColumn() {
  const rounds = useAppSelector(state => state.rounds);
  const players = useAppSelector(state => state.players);

  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-orange-200">
            {/* 라운드 번호를 나열할 열 */}
            {
              Array.from({ length: rounds }).map((_, index) => (
                <th
                  key={index}
                  className={TABLE_STYLE.th}>
                  {index + 1}R
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            players.map((player, playerIndex) => (
              // 플레이어당 하나의 행
              <tr
                key={player.id}
                // 짝수행 배경색 추가
                className={`${playerIndex % 2 !== 0 && 'bg-orange-50'}`}>
                {
                  // 라운드 수만큼 반복
                  Array.from({ length: rounds }).map((_, index) => (
                    // 각 라운드에 대한 점수 셀
                    <ScoreCell
                      key={index}
                      playerId={player.id}
                      roundIndex={index}
                      currentScore={player.scores[index] || 0} />
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}