interface KeyDownEventProps {
    onEnter?: () => void;
    onEscape?: () => void;
}

// 키 이벤트 처리 유틸리티
export const keyDownEvent = ({ onEnter, onEscape }: KeyDownEventProps) => {
    return (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            
            onEnter?.();
        } else if (e.key === 'Escape') {
            onEscape?.();
        }
    }
};
