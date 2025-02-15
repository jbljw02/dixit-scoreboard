import { useEffect } from "react";

// 뷰포트 높이 계산 훅
export default function useViewportCalculator() {
    useEffect(() => {
        // 실제 뷰포트 높이를 계산하고 CSS 변수로 설정
        const calculateViewport = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        calculateViewport();

        // 스크롤, 리사이즈, 화면 회전에 대응
        window.addEventListener('scroll', calculateViewport);
        window.addEventListener('resize', calculateViewport);
        window.addEventListener('orientationchange', calculateViewport);

        return () => {
            window.removeEventListener('scroll', calculateViewport);
            window.removeEventListener('resize', calculateViewport);
            window.removeEventListener('orientationchange', calculateViewport);
        };
    }, []);

    return null;
}