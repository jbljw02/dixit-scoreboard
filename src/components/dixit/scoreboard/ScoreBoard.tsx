import CommonButton from '../../common/CommonButton';
import PlayerColumn from './PlayerColumn';
import RoundColumn from './RoundColumn';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addRound } from '../../../store/features/roundSlice';
import Footer from '../Footer';

export default function ScoreBoard() {
  const dispatch = useAppDispatch();

  const isGameStarted = useAppSelector(state => state.isGameStarted);

  return (
    <div className="flex flex-col flex-1 mb-6 bg-white rounded-lg shadow-md">
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
          <div className="p-4 flex justify-end">
            <CommonButton
              type="button"
              onClick={() => dispatch(addRound())}>
              라운드 추가
            </CommonButton>
          </div>
        )
      }
      <div className="flex-grow" />
      {
        isGameStarted && (
          <Footer />
        )
      }
    </div>
  );
}