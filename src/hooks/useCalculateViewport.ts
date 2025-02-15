import { useEffect } from "react";

interface ViewportCalculatorProps {
    onResize?: () => void;
}

// 뷰포트 높이 계산 훅
export default function useViewportCalculator({ onResize }: ViewportCalculatorProps = {}) {
    useEffect(() => {
        // 실제 뷰포트 높이를 계산하고 CSS 변수로 설정
        const calculateViewport = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            onResize?.();
        };

        // 초기 실행
        calculateViewport();

        // 스크롤, 리사이즈, 화면 회전에 대응
        const events = ['scroll', 'resize', 'orientationchange'];
        events.forEach(event => {
            window.addEventListener(event, calculateViewport);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, calculateViewport);
            });
        };
    }, [onResize]);

    return null;
}