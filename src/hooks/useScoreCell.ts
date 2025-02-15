import { useState } from "react";
import { EditingCell } from "../types/dixit.type";
import getTotal from "../utils/getTotal";
import useGameState from "./useGameState";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateScore } from "../store/features/playerSlice";

// 점수 관리 훅
export default function useScoreCell() {
    const dispatch = useAppDispatch();

    const players = useAppSelector(state => state.players);
    const targetScore = useAppSelector(state => state.targetScore);

    const [editingCell, setEditingCell] = useState<EditingCell | null>(null); // 현재 수정 중인 셀 정보
    const [editingScore, setEditingScore] = useState<string>(''); // 현재 수정 중인 점수
    const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가

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
        const value = e.target.value;
        const numberValue = Number(value);

        /**
          * 최대 점수 계산(이야기꾼이 아닐 때) 및 제한
          *
          * 4명 참가: 3점(이야기꾼 카드 맞춤) + 2점(남은 인원 2명이 내 카드 고름) = 5점
          * 5명 참가: 3점(이야기꾼 카드 맞춤) + 3점(남은 인원 3명이 내 카드 고름) = 6점
          * 6명 참가: 3점(이야기꾼 카드 맞춤) + 4점(남은 인원 4명이 내 카드 고름) = 7점
          *
          * 즉, 한 라운드당 최대 점수는 `플레이어 수 + 1`점
          */
        const maxScore = players.length + 1;
        if (numberValue > maxScore) {
            setErrorMessage(`현재 라운드의 최대 점수는 ${maxScore}점이에요`);
            setEditingScore(String(maxScore)); // 최대값을 초과할 경우 최대값으로 설정하고 작업 중지
            return;
        }

        setErrorMessage('');
        setEditingScore(String(numberValue));
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
        if (newTotalScore >= targetScore && player) {
            gameOverEvent(player.name, newTotalScore);
        }

        // 상태 초기화
        setEditingScore('');
        setErrorMessage('');
        setEditingCell(null);
    };

    // ENTER: 점수 제출, ESC: 수정 중인 셀 정보 초기화
    const keyDownEvent = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // 이벤트 전파 및 버블링 방지
            e.preventDefault();
            e.stopPropagation();

            cellScoreSubmit();
        } else if (e.key === 'Escape') {
            setEditingCell(null);
            setEditingScore('');
        }
    };

    return {
        editingCell,
        editingScore,
        errorMessage,
        cellClick,
        cellScoreChange,
        cellScoreSubmit,
        keyDownEvent
    }
}