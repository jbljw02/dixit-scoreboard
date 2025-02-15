// 플레이어가 가지는 정보에 대한 인터페이스
export interface Player {
    id: string;
    name: string;
    scores: number[];
    totalScore: number;
}

// 수정 중인 셀의 정보에 대한 인터페이스
export interface EditingCell {
    playerId: string;
    roundIndex: number;
}