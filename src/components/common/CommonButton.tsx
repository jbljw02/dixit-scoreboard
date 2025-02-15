import { ButtonHTMLAttributes } from "react";

export default function CommonButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={`px-4 py-2 whitespace-nowrap text-white rounded-lg transition-colors
                ${props.className}
                ${props.disabled ?
                    'bg-gray-400 cursor-not-allowed' :
                    'bg-[#FF7F50] hover:bg-orange-600 cursor-pointer'}
            `}
            disabled={props.disabled}>
            {props.children}
        </button>
    )
}