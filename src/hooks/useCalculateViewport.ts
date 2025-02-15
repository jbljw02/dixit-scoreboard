import { useEffect } from "react";

export default function useCalculateViewport() {
    useEffect(() => {
        // 실제 뷰포트 높이를 계산하고 CSS 변수로 설정하는 함수
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // 초기 실행
        setVH();

        // 화면 크기가 변할 때마다 뷰포트 높이 계산
        window.addEventListener('resize', setVH);

        // orientationchange 이벤트 리스너(화면 회전)
        window.addEventListener('orientationchange', setVH);

        return () => {
            window.removeEventListener('resize', setVH);
            window.removeEventListener('orientationchange', setVH);
        };
    }, []);
}