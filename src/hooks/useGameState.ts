import Swal from 'sweetalert2';

interface UseGameStateProps {
    onRestartGame: () => void;
}

export default function useGameState({ onRestartGame }: UseGameStateProps) {
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
            if (result.isConfirmed) {
                // 새 게임 시작
                window.location.reload();
            } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                onRestartGame();
            }
        });
    };

    return { gameOverEvent };
}