import { useState } from 'react';

interface UseTimeoutErrorProps {
    duration?: number;  // 에러 표시 지속 시간 (ms)
}

export default function useTimeoutError({ duration = 800 }: UseTimeoutErrorProps = {}) {
    const [isError, setIsError] = useState(false);

    const showError = () => {
        setIsError(true); // 에러 발생

        // 지정된 시간 후 에러 해제
        setTimeout(() => {
            setIsError(false);
        }, duration);
    };

    return { isError, setIsError, showError };
}