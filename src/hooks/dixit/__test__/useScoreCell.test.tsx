import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import useScoreCell from '../useScoreCell';

describe('useScoreCell', () => {
    const mockStore = configureStore([]);
    
    // 테스트를 위한 초기 상태 설정
    // 1명의 플레이어 정보와 목표 점수 30점 설정
    const initialState = {
        players: [
            { id: '1', name: 'Player 1', scores: [], totalScore: 0 },
            { id: '2', name: 'Player 2', scores: [], totalScore: 0 },
            { id: '3', name: 'Player 3', scores: [], totalScore: 0 },
            { id: '4', name: 'Player 4', scores: [], totalScore: 0 },
            { id: '5', name: 'Player 5', scores: [], totalScore: 0 },
            { id: '6', name: 'Player 6', scores: [], totalScore: 0 },
        ],
        targetScore: '30'
    };

    test('최대 점수를 초과하는 값은 제출되지 않아야 함', () => {
        const store = mockStore(initialState);
        
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <Provider store={store}>{children}</Provider>
        );

        const { result } = renderHook(() => useScoreCell(), { wrapper });

        // 첫 번째 플레이어의 첫 번째 라운드 셀 클릭 시뮬레이션
        act(() => {
            result.current.cellClick('1', 0, 0);
        });

        // 현재 플레이어 수(6명) + 1 = 7점이 최대 점수인데,
        // 10점을 입력하여 최대 점수를 초과하는 상황 시뮬레이션
        act(() => {
            result.current.cellScoreChange({ 
                target: { value: '10' } 
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // 초과된 점수에 대한 제출 시도
        act(() => {
            result.current.cellScoreSubmit();
        });

        // 최대 점수를 초과했으므로 Redux 액션이 발생하지 않아야 함
        // store.getActions()의 길이가 0이면 액션이 발생하지 않은 것
        expect(store.getActions()).toHaveLength(0);
    });
});