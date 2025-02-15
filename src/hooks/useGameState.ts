import Swal from 'sweetalert2';
import { resetRounds } from '../store/features/roundSlice';
import { useAppDispatch } from '../store/hooks';
import { resetScores } from '../store/features/playerSlice';

interface GameState {
    gameOverEvent: (playerName: string, totalScore: number) => void;
    restartGame: () => void;
}

export default function useGameState(): GameState {
    const dispatch = useAppDispatch();

    // 라운드 및 플레이어의 점수 초기화
    const restartGame = () => {
        dispatch(resetRounds());
        dispatch(resetScores());
    }

    const gameOverEvent = (playerName: string, totalScore: number) => {
        Swal.fire({
            title: '🎉 게임 종료!',
            text: `${playerName}님이 ${totalScore}점으로 승리했어요!`,
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: '새 게임',
            confirmButtonColor: '#FF7F50',
            cancelButtonText: '이대로 다시 하기',
            cancelButtonColor: '#FF7F50',
            customClass: {
                confirmButton: 'px-4 py-2 text-white rounded-lg',
                cancelButton: 'px-4 py-2 text-white rounded-lg'
            }
        }).then((result) => {
            // 새로고침 -> 새 게임 시작
            if (result.isConfirmed) {
                window.location.reload();
            }
            // 라운드와 점수만 초기화하여 게임 다시 시작
            else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                restartGame();
            }
        });
    };

    return { gameOverEvent, restartGame };
}