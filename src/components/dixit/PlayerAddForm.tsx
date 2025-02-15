import { useState } from 'react';
import CommonInput from '../common/CommonInput';
import CommonButton from '../common/CommonButton';
import { addPlayer } from '../../store/features/playerSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function PlayerAddForm() {
  const dispatch = useAppDispatch();

  const players = useAppSelector(state => state.players);
  const [newPlayerName, setNewPlayerName] = useState<string>(''); // 추가될 플레이어명

  const submitForm = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if (newPlayerName.trim() === '') return; // 공백 요청 시 작업 중단
    if (players.length >= 6) return; // Dixit의 권장 인원 수를 고려하여 6인 제한

    dispatch(addPlayer(newPlayerName)); // 플레이어 추가
    setNewPlayerName(''); // 작업 완료 후 플레이어명 초기화
  };

  return (
    <div className="flex flex-row gap-3 mb-6 p-4 bg-white rounded-lg shadow-md">
      {/* 플레이어를 추가하는 폼 */}
      <form className='flex flex-1' onSubmit={submitForm}>
        <CommonInput
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="추가할 플레이어명" />
      </form>
      <CommonButton
        type="submit"
        onClick={submitForm}
        // 플레이어명이 공백일 경우 버튼 비활성화
        disabled={newPlayerName.trim() === ''}>
        추가
      </CommonButton>
    </div>
  );
}