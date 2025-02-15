import CommonButton from '../../common/CommonButton';
import PlayerColumn from './PlayerColumn';
import RoundColumn from './RoundColumn';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addRound } from '../../../store/features/roundSlice';
import Footer from '../Footer';

export default function ScoreBoard() {
  const dispatch = useAppDispatch();

  const players = useAppSelector(state => state.players);
  const isGameStarted = useAppSelector(state => state.isGameStarted);

  return (
    <div className="flex flex-col mb-6 bg-white rounded-lg shadow-md overflow-y-auto">
      <div className="flex w-full">
        {/* 왼쪽 고정 열(플레이어) */}
        <PlayerColumn />
        {/* 각 라운드당 점수 표시 */}
        {
          isGameStarted && (
            <RoundColumn />
          )
        }
      </div>
      {/* 라운드 추가 버튼 */}
      {
        isGameStarted && (
          <div className="p-4 flex justify-between">
            <div className='text-[13px] pt-0.5'>
              라운드당 최대 점수: <b className='underline text-red-500'>{players.length + 1}점</b>
            </div>
            <CommonButton
              type="button"
              onClick={() => dispatch(addRound())}>
              라운드 추가
            </CommonButton>
          </div>
        )
      }
      {/* 새 게임 및 다시 시작 버튼 */}
      {
        isGameStarted && (
          <>
            <div className="flex-grow" />
            <Footer />
          </>
        )
      }
    </div>
  );
}