import { InputProps } from "../../types/common.type";

export default function CommonInput({ errorText, ...props }: InputProps) {
    return (
        <div className="relative w-full">
            <input
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
            {
                // 유효하지 않은 요청 시 에러 메시지 표시
                errorText && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                               bg-red-200 text-red-600 text-xs px-2 py-1 rounded 
                               whitespace-nowrap z-20">
                        {errorText}
                    </div>
                )
            }
        </div>
    )
}