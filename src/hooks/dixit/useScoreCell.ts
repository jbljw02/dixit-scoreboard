import { useState } from "react";
import { EditingCell } from "../../types/dixit.type";
import getTotal from "../../utils/getTotal";
import useGameState from "./useGameState";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateScore } from "../../store/features/playerSlice";
import { keyDownEvent } from "../../utils/keyDownEvent";
import { GAME_CONFIG } from "../../config/game.config";

// 점수 관리 훅
export default function useScoreCell() {
    const dispatch = useAppDispatch();

    const players = useAppSelector(state => state.players);
    const targetScore = useAppSelector(state => state.targetScore);

    const [editingCell, setEditingCell] = useState<EditingCell | null>(null); // 현재 수정 중인 셀 정보
    const [editingScore, setEditingScore] = useState<string>(''); // 현재 수정 중인 점수

    const { gameOverEvent } = useGameState();

    // 셀 클릭 시 점수 수정 시작
    const cellClick = (playerId: string, roundIndex: number, currentScore: number) => {
        setEditingCell({
            playerId, // 어떤 플레이어인지(행, 세로 위치)
            roundIndex // 몇 번째 라운드인지(열, 가로 위치)
        });
        setEditingScore(String(currentScore));
    };

    // 클릭된 셀의 점수 변경
    const cellScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const currentMaxScore = GAME_CONFIG.MAX_SCORE_PER_ROUND(players.length);

        // 입력값이 최대 점수를 초과하는 경우
        if (value > currentMaxScore) {
            setEditingScore(String(currentMaxScore));
            return;
        }

        setEditingScore(String(value));
    };

    // 변경된 셀의 점수를 사용자 정보에 저장
    const cellScoreSubmit = () => {
        if (!editingCell) return;

        const newScore = Number(editingScore);
        if (isNaN(newScore) ||
            newScore < 0 ||
            newScore > players.length + 1)
            return;

        // 점수 업데이트
        dispatch(updateScore({
            playerId: editingCell.playerId,
            roundIndex: editingCell.roundIndex,
            newScore
        }));

        // 해당 플레이어의 새로운 총점 계산
        const player = players.find(player => player.id === editingCell.playerId);
        const newTotalScore = getTotal(player?.scores || []) + newScore;

        // 목표 점수 도달 시 게임 종료
        if (newTotalScore >= Number(targetScore) && player) {
            gameOverEvent(player.name, newTotalScore);
        }

        // 상태 초기화
        setEditingScore('');
        setEditingCell(null);
    };

    // ENTER: 점수 제출, ESC: 수정 중인 셀 정보 초기화
    const scoreCellKeyDownEvent = keyDownEvent({
        onEnter: cellScoreSubmit,
        onEscape: () => {
            setEditingCell(null);
            setEditingScore('');
        }
    });

    return {
        editingCell,
        editingScore,
        cellClick,
        cellScoreChange,
        cellScoreSubmit,
        scoreCellKeyDownEvent
    }
}