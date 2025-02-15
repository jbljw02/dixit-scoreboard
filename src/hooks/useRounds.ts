import { useEffect, useState } from "react";
import { Player } from "../types/dixit.type";

// 라운드 관리 훅
export default function useRounds({ players, isGameStarted }: { players: Player[], isGameStarted: boolean }) {
    // 사용자의 수에 따른 적절한 초기 라운드 수 계산
    const calculateInitialRounds = () => {
        const maxScorePerRound = players.length + 1;
        const minimumRounds = Math.ceil(30 / maxScorePerRound); // 기본 승리 조건 30점 기준
        return minimumRounds + 2; // 여유분 2라운드 추가
    };

    // 라운드 수
    const [rounds, setRounds] = useState<number>(
        isGameStarted ?
            calculateInitialRounds() :
            0
    );

    // 새로운 라운드 추가
    const addNewRound = () => {
        setRounds(prev => prev + 1);
    };

    // 게임 시작 시 라운드 수 계산
    useEffect(() => {
        if (isGameStarted) {
            setRounds(calculateInitialRounds());
        }
    }, [isGameStarted, players.length]);

    return { rounds, addNewRound };
}