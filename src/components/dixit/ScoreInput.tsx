import { useState } from 'react';
import { ScoreInputProps } from '../../types/dixit.type';
import CommonButton from '../common/CommonButton';
import CommonInput from '../common/CommonInput';
import CommonSelect from '../common/CommonSelect';

export default function ScoreInput({ players, onAddScore }: ScoreInputProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string>(''); // 점수를 추가할 플레이어
  const [score, setScore] = useState<number>(0);
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');

  const submitForm = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    onAddScore(selectedPlayer, score);
    setScore(0); // 작업 완료 후 점수 초기화
  };

  const scoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 플레이어를 선택하지 않았을 경우 작업 중단
    if (selectedPlayer === '') {
      setInputErrorMessage('플레이어를 선택해주세요');
      setScore(0);
      return;
    }

    // 숫자가 아닌 값이 입력되었을 경우 작업 중단
    if (isNaN(Number(value))) {
      setInputErrorMessage('숫자만 입력할 수 있어요');
      setScore(0);
      return;
    }

    const numberValue = Number(value);
    setInputErrorMessage('');
    setScore(numberValue);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex-none">
      <div className="flex flex-col gap-4">
        {/* 플레이어 선택 드롭다운 */}
        <CommonSelect
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          placeholder="플레이어 선택"
          options={players.map((player) => ({
            key: player.id,
            label: player.name
          }))} />
        <div className="flex items-start gap-3">
          {/* 점수 입력 폼 */}
          <form className='flex-1' onSubmit={submitForm}>
            <CommonInput
              type="number"
              min={0}
              max={6}
              value={score}
              onChange={scoreChange}
              errorText={inputErrorMessage} />
          </form>
          <CommonButton
            onClick={submitForm}
            type="submit"
            disabled={score <= 0 || selectedPlayer === ''}>
            점수 추가
          </CommonButton>
        </div>
      </div>
    </div>
  );
}