import { renderHook, act } from '@testing-library/react';
import useTimeoutError from '../useTimeoutError';

describe('useTimeoutError', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('showError 호출 시 에러가 표시되고 지정된 시간 후에 사라져야 함', () => {
        const { result } = renderHook(() => useTimeoutError({ duration: 800 }));

        // 에러 상태를 활성화
        act(() => {
            result.current.showError();
        });

        // 에러 상태가 활성화되었는지 확인
        expect(result.current.isError).toBe(true);

        // 타이머를 800ms 진행
        act(() => {
            jest.advanceTimersByTime(800);
        });

        // 지정된 시간이 지난 후 에러 상태가 해제되었는지 확인
        expect(result.current.isError).toBe(false);
    });
});