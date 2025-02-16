export const GAME_CONFIG = {
    // 게임 인원 제한
    PLAYERS: {
        MIN: Number(import.meta.env.VITE_MIN_PLAYERS),
        MAX: Number(import.meta.env.VITE_MAX_PLAYERS),
    },
    /**
     * 최대 점수 계산(이야기꾼이 아닐 때) 및 제한
     *
     * 4명 참가: 3점(이야기꾼 카드 맞춤) + 2점(남은 인원 2명이 내 카드 고름) = 5점
     * 5명 참가: 3점(이야기꾼 카드 맞춤) + 3점(남은 인원 3명이 내 카드 고름) = 6점
     * 6명 참가: 3점(이야기꾼 카드 맞춤) + 4점(남은 인원 4명이 내 카드 고름) = 7점
     *
     * 즉, 한 라운드당 최대 점수는 `플레이어 수 + 1`점
     */
    MAX_SCORE_PER_ROUND: (players: number) => players + 1,
}