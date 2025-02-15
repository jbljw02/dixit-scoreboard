import { InputProps } from "../../types/common.type";
import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import useViewportCalculator from '../../hooks/useCalculateViewport';

export default function CommonInput({ errorText, ...props }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorPosition, setErrorPosition] = useState<{ top: number; left: number } | null>(null);

    // 에러 메시지 위치 업데이트
    const updateErrorPosition = () => {
        if (inputRef.current && errorText) {
            const rect = inputRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;

            setErrorPosition({
                top: rect.bottom + scrollY + 8,
                left: rect.left + rect.width / 2 // input 기준 중앙
            });
        } else {
            setErrorPosition(null); // 초기 위치에 발생하는 깜빡임을 방지
        }
    };

    useViewportCalculator({ onResize: updateErrorPosition });

    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
                className={`w-full px-3 py-2 border border-orange-200 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-orange-400 
                   ${props.className}`}
                autoFocus={props.autoFocus} />
            {/* 유효하지 않은 요청 시 에러 메시지 표시 */}
            {/* createPortal를 이용해 부모 요소에 의해 잘리지 않도록 함 */}
            {
                errorText && errorPosition && createPortal(
                    <div
                        className="bg-red-200 text-red-600 text-xs px-2 py-1 rounded 
                            whitespace-nowrap z-50"
                        style={{
                            position: 'fixed',
                            top: `${errorPosition.top}px`,
                            left: `${errorPosition.left}px`,
                            transform: 'translateX(-50%)'
                        }}>
                        {errorText}
                    </div>,
                    document.body
                )
            }
        </div>
    )
}