import '@testing-library/jest-dom';

// Redux store mock
jest.mock('./src/store/hooks', () => ({
    useAppDispatch: () => jest.fn(),
    useAppSelector: jest.fn((selector) => selector({
        players: [],
        targetScore: '30',
        rounds: 6,
        isGameStarted: false
    }))
}));

// SweetAlert2 mock(useGameState에서 사용)
jest.mock('sweetalert2', () => ({
    fire: jest.fn().mockResolvedValue({ isConfirmed: true })
}));

// window.matchMedia mock(Tailwind 사용)
Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    })),
});

// 타이머 mock(useTimeoutError에서 사용)
jest.useFakeTimers();