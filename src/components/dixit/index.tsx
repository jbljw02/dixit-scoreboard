import { useState } from 'react';
import PlayerAddForm from './PlayerAddForm';
import ScoreBoard from './scoreboard/ScoreBoard';
import { Player, UpdateScoreProps } from '../../types/dixit.type';
import CommonButton from '../common/CommonButton';
import getTotal from '../../utils/getTotal';
import TargetScoreInput from './TargetScoreInput';

export default function Dixit() {
    const [players, setPlayers] = useState<Player[]>([]); // 플레이어 목록
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [targetScore, setTargetScore] = useState<number>(30); // 승리 조건 점수

    // 플레이어 추가
    const addPlayer = (name: string) => {
        if (players.length >= 6) return; // Dixit의 권장 인원 수를 고려하여 6인 제한
        if (name.trim() === '') return; // 공백 요청 시 작업 중단

        setPlayers([
            ...players,
            { id: crypto.randomUUID(), name, scores: [], totalScore: 0 }
        ]);
    };

    // 점수 수정
    const updateScore = ({ playerId, roundIndex, newScore }: UpdateScoreProps) => {
        setPlayers(players.map(player => {
            // 점수를 수정할 플레이어를 찾기
            if (player.id === playerId) {
                // 해당 플레이어의 점수 배열에 새로운 점수를 추가
                const newScores = [...player.scores];
                newScores[roundIndex] = newScore;
                return { ...player, scores: newScores, totalScore: getTotal(newScores) };
            }

            return player; // 다른 플레이어는 그대로 반환
        }));
    };

    // 게임을 재시작(플레이어는 유지하고 점수 및 라운드 초기화)
    const restartGame = () => {
        setPlayers(players.map(player => ({
            ...player,
            scores: [],
            totalScore: 0
        })));
        setIsGameStarted(true);
    };

    return (
        <div className="flex flex-col h-screen min-h-screen bg-gradient-to-b from-orange-100 to-yellow-50 px-9 py-7 overflow-hidden">
            <h1 className="text-4xl font-bold text-center mb-6 text-orange-600 font-serif tracking-wider flex-none">
                Dixit Score Board
            </h1>
            {/* 승리 조건 점수 설정 영역 */}
            {
                !isGameStarted && (
                    <TargetScoreInput
                        targetScore={targetScore}
                        onTargetScoreChange={setTargetScore} />
                )
            }
            {/* 플레이어 수가 최대 인원 수를 넘지 않으면 추가 폼 출력 */}
            {
                players.length < 6 && !isGameStarted && (
                    <PlayerAddForm onAddPlayer={addPlayer} />
                )
            }
            {/* 플레이어가 존재하면 점수 보드와 점수 입력 폼 출력 */}
            {
                players.length > 0 && (
                    <>
                        <ScoreBoard
                            players={players}
                            onUpdateScore={updateScore}
                            isGameStarted={isGameStarted}
                            targetScore={targetScore}
                            onRestartGame={restartGame} />
                        {
                            !isGameStarted && (
                                <CommonButton
                                    type="button"
                                    onClick={() => setIsGameStarted(true)}
                                    disabled={players.length < 4} // 4인 이상 게임 시작 가능
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