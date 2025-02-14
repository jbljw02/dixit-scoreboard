import { useState } from 'react';
import { ScoreBoardProps, EditingCell } from '../../types/dixit.type';
import CommonButton from '../common/CommonButton';
import CommonInput from '../common/CommonInput';

export default function ScoreBoard({ players, onUpdateScore }: ScoreBoardProps) {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null); // 현재 수정 중인 셀 정보
  const [editingScore, setEditingScore] = useState<string>(''); // 현재 수정 중인 점수
  const [rounds, setRounds] = useState<number>(1); // 현재 라운드 수 관리
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가

  const getTotal = (scores: number[]) => scores.reduce((sum, score) => sum + score, 0);

  // 셀 클릭 시 점수 수정 시작
  const cellClick = (playerId: string, roundIndex: number, currentScore: number) => {
    setEditingCell({
      playerId, // 어떤 플레이어인지(행, 세로 위치)
      roundIndex // 몇 번째 라운드인지(열, 가로 위치)
    });
    setEditingScore(String(currentScore));
  };

  // 클릭된 셀의 점수 변경
  const cellScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);

    /**
      * 최대 점수 계산(이야기꾼이 아닐 때) 및 제한
      *
      * 4명 참가: 3점(이야기꾼 카드 맞춤) + 2점(남은 인원 2명이 내 카드 고름) = 5점
      * 5명 참가: 3점(이야기꾼 카드 맞춤) + 3점(남은 인원 3명이 내 카드 고름) = 6점
      * 6명 참가: 3점(이야기꾼 카드 맞춤) + 4점(남은 인원 4명이 내 카드 고름) = 7점
      *
      * 즉, 한 라운드당 최대 점수는 `플레이어 수 + 1`점
      */
    const maxScore = players.length + 1;
    if (numberValue > maxScore) {
      setErrorMessage(`현재 라운드의 최대 점수는 ${maxScore}점이에요`);
      setEditingScore(String(maxScore)); // 최대값을 초과할 경우 최대값으로 설정하고 작업 중지
      return;
    }

    setErrorMessage('');
    setEditingScore(String(numberValue));
  };

  // 변경된 셀의 점수를 사용자 정보에 저장
  const cellScoreSubmit = () => {
    if (!editingCell) return;

    const newScore = Number(editingScore);
    if (isNaN(newScore) ||
      newScore < 0 ||
      newScore > players.length + 1)
      return;

    onUpdateScore(editingCell.playerId, editingCell.roundIndex, newScore);

    // 제출 후 점수, 에러 메시지, 수정 중인 셀 정보 초기화
    setEditingScore('');
    setErrorMessage('');
    setEditingCell(null);
  };

  // ENTER: 점수 제출, ESC: 수정 중인 셀 정보 초기화
  const keyDownEvent = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      cellScoreSubmit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditingScore('');
    }
  };

  // 새로운 라운드 추가
  const addNewRound = () => {
    setRounds(prev => prev + 1);
  };

  return (
    <div className="flex-1 mb-6 bg-white rounded-lg shadow-md">
      <div className="w-full overflow-x-auto min-w-0">
        <table className="w-full border-collapse min-w-[800px]">
          <colgroup>
            <col className="w-[150px] min-w-[150px]" />  {/* 플레이어 열: 고정 너비 */}
            {
              Array.from({ length: rounds }).map((_, i) => (
                <col key={i} className="min-w-[100px]" />
              ))
            }
            <col className="w-[100px] min-w-[100px]" />  {/* 총점 열: 고정 너비 */}
          </colgroup>

          <thead>
            <tr className="bg-orange-100">
              <th className="p-3 text-center font-semibold sticky left-0 
                            bg-orange-200 z-20 border-b">
                플레이어
              </th>
              {/* 현재 라운드 수만큼 순회 및 열 생성 */}
              {
                Array.from({ length: rounds }).map((_, index) => (
                  <th key={index} className="p-3 text-center border-b bg-orange-200">
                    {index + 1}R
                  </th>
                ))
              }
              <th className="p-3 text-center font-semibold sticky right-0 
                            bg-orange-200 z-20 border-b">
                총점
              </th>
            </tr>
          </thead>

          <tbody>
            {
              players.map((player) => (
                <tr key={player.id} className="border-b border-gray-100">
                  <td className="p-3 text-center sticky left-0 
                              bg-white z-10 whitespace-nowrap">
                    {player.name}
                  </td>
                  {/* 현재 라운드 수만큼 순회 및 열 생성 */}
                  {
                    Array.from({ length: rounds }).map((_, index) => (
                      <td
                        key={index}
                        className="p-3 text-center cursor-pointer hover:bg-orange-50"
                        onClick={() => cellClick(player.id, index, player.scores[index] || 0)}>
                        {
                          // 수정 중인 셀
                          editingCell?.playerId === player.id &&
                            editingCell?.roundIndex === index ? (
                            <CommonInput
                              type="number"
                              value={editingScore}
                              onChange={cellScoreChange}
                              onKeyDown={keyDownEvent}
                              onBlur={cellScoreSubmit}
                              errorText={errorMessage}
                              autoFocus={true} />
                          ) :
                            // 일반 셀
                            (
                              player.scores[index] || 0
                            )
                        }
                      </td>
                    ))
                  }
                  <td className="p-3 text-center sticky right-0 
                              bg-white z-10 whitespace-nowrap">
                    {getTotal(player.scores)}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="p-4 flex justify-end">
        <CommonButton
          onClick={addNewRound}
          type="button">
          라운드 추가
        </CommonButton>
      </div>
    </div>
  );
}