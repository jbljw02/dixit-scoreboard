import { ButtonHTMLAttributes } from "react";

export default function CommonButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className="px-4 py-2 whitespace-nowrap bg-orange-500 text-white rounded-lg 
            hover:bg-orange-600 transition-colors"
            // 비활성화 조건 충족 시 버튼 비활성화
            disabled={props.disabled}
            style={{
                backgroundColor: props.disabled ? '#ccc' : '#FF7F50',
                cursor: props.disabled ? 'not-allowed' : 'pointer'
            }}>
            {props.children}
        </button>
    )
}