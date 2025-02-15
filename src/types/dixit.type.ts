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

// 플레이어를 추가하는 폼의 props 인터페이스
export interface PlayerAddFormProps {
    onAddPlayer: (name: string) => void;
}

// 점수판의 props 인터페이스
export interface ScoreBoardProps {
    onRestartGame: () => void;
}

// 점수를 입력하는 컴포넌트의 props 인터페이스
export interface ScoreInputProps {
    players: Player[];
    onAddScore: (playerId: string, score: number) => void;
}

// 점수를 수정하는 함수의 props 인터페이스
export interface UpdateScoreProps {
    playerId: string;
    roundIndex: number;
    newScore: number;
}
