import { useState } from 'react';
import PlayerAddForm from './PlayerAddForm';
import ScoreBoard from './ScoreBoard';
import PlayerScoreForm from './PlayerScoreForm';
import { Player } from '../../types/dixit.type';

export default function Dixit() {
    const [players, setPlayers] = useState<Player[]>([]); // 플레이어 목록

    console.log('players', players);

    // 플레이어 추가
    const addPlayer = (name: string) => {
        if (players.length >= 6) return; // Dixit의 권장 인원 수를 고려하여 6인 제한
        if (name.trim() === '') return; // 공백 요청 시 작업 중단

        setPlayers([
            ...players,
            { id: crypto.randomUUID(), name, scores: [] }
        ]);
    };

    // 점수 추가
    const addScore = (playerId: string, score: number) => {
        if (score < 0) return; // 0 이상의 점수만 허용

        // 플레이어 목록을 순회하면서 새로운 배열 생성
        setPlayers(
            players.map(player => {
                // 점수를 추가할 플레이어를 찾기
                if (player.id === playerId) {
                    // 해당 플레이어의 점수 배열에 새로운 점수를 추가
                    const updatedPlayer = {
                        ...player,
                        scores: [...player.scores, score]
                    };
                    return updatedPlayer;
                }

                return player; // 다른 플레이어는 그대로 반환
            })
        );
    };

    // 점수 수정
    const updateScore = (playerId: string, roundIndex: number, newScore: number) => {
        setPlayers(players.map(player => {
            // 점수를 수정할 플레이어를 찾기
            if (player.id === playerId) {
                // 해당 플레이어의 점수 배열에 새로운 점수를 추가
                const newScores = [...player.scores];
                newScores[roundIndex] = newScore;
                return { ...player, scores: newScores };
            }
            
            return player; // 다른 플레이어는 그대로 반환
        }));
    };

    return (
        <div className="flex flex-col h-screen min-h-screen bg-gradient-to-b from-orange-100 to-yellow-50 px-9 py-7">
            <h1 className="text-4xl font-bold text-center mb-6 text-orange-600 font-serif tracking-wider flex-none">
                Dixit Score Board
            </h1>
            {/* 플레이어 수가 최대 인원 수를 넘지 않으면 추가 폼 출력 */}
            {
                players.length < 6 && (
                    <PlayerAddForm onAddPlayer={addPlayer} />
                )
            }
            {/* 플레이어가 존재하면 점수 보드와 점수 입력 폼 출력 */}
            {
                players.length > 0 && (
                    <>
                        <ScoreBoard players={players} onUpdateScore={updateScore} />
                        {/* <PlayerScoreForm players={players} onAddScore={addScore} /> */}
                    </>
                )
            }
        </div>
    );
}