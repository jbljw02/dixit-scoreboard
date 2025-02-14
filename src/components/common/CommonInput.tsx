import { InputProps } from "../../types/common.type";

export default function CommonInput({ errorText, ...props }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-orange-400"
                autoFocus={props.autoFocus} />
            {
                // 유효하지 않은 요청 시 에러 메시지 표시
                errorText && (
                    <span className="text-red-500 text-[13px] pl-1 pt-2 text-left">{errorText}</span>
                )
            }
        </div>
    )
}