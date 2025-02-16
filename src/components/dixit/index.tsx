import PlayerAddForm from './PlayerAddForm';
import ScoreBoard from './scoreboard/ScoreBoard';
import CommonButton from '../common/CommonButton';
import TargetScoreInput from './TargetScoreInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsGameStarted } from '../../store/features/gameSlice';
import { GAME_CONFIG } from '../../config/game.config';

export default function Dixit() {
    const dispatch = useAppDispatch();

    const players = useAppSelector(state => state.players);
    const isGameStarted = useAppSelector(state => state.isGameStarted);

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-orange-100 to-yellow-50 px-9 py-7 overflow-hidden">
            <h1
                onClick={() => window.location.reload()}
                className="text-4xl font-bold text-center mb-8 text-orange-600 font-serif tracking-wider flex-none">
                Dixit Score Board
            </h1>
            {/* 승리 조건 점수 설정 영역 */}
            {
                !isGameStarted && (
                    <TargetScoreInput />
                )
            }
            {/* 플레이어 수가 최대 인원 수를 넘지 않으면 추가 폼 출력 */}
            {
                players.length < GAME_CONFIG.PLAYERS.MAX && !isGameStarted && (
                    <PlayerAddForm />
                )
            }
            {/* 플레이어가 존재하면 점수 보드와 점수 입력 폼 출력 */}
            {
                players.length > 0 && (
                    <>
                        <ScoreBoard />
                        {
                            !isGameStarted && (
                                <CommonButton
                                    type="button"
                                    onClick={() => dispatch(setIsGameStarted(true))}
                                    disabled={players.length < GAME_CONFIG.PLAYERS.MIN} // 4인 이상 게임 시작 가능
                                    className="py-4 text-base">
                                    게임 시작
                                </CommonButton>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}