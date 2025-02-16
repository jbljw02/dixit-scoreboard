export const GAME_CONFIG = {
    // 게임 인원 제한
    PLAYERS: {
        MIN: 3,
        MAX: 6,
    },
    // 라운드당 최대 점수
    MAX_SCORE_PER_ROUND: (players: number) => players + 1,
};