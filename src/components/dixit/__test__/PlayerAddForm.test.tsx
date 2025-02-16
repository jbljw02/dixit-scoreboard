import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlayerAddForm from '../PlayerAddForm';

describe('PlayerAddForm', () => {
    test('최대 인원 초과 시 플레이어를 추가할 수 없어야 함', () => {
        // 배열에 6명의 플레이어를 미리 추가하여 최대 인원 상태를 만듦
        const initialState = {
            players: Array(6).fill({ id: '1', name: 'Player' }),
            targetScore: '30',
            rounds: 6,
            isGameStarted: false
        };

        const mockStore = configureStore([])(initialState);

        const { getByRole } = render(
            <Provider store={mockStore}>
                <PlayerAddForm />
            </Provider>
        );

        const input = getByRole('textbox'); // 텍스트 입력 필드
        const button = getByRole('button'); // 추가 버튼

        // 사용자 입력 시뮬레이션
        fireEvent.change(input, { target: { value: 'New Player' } }); // 새로운 플레이어 이름 입력
        fireEvent.click(button); // 추가 버튼 클릭

        // 테스트 검증 - 최대 인원을 초과하므로 액션이 발생하지 않아야 함
        expect(mockStore.getActions()).toHaveLength(0);
    });
});