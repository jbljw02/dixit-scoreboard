import { InputProps } from "../../types/common.type";

export default function CommonInput({ errorText, ...props }: InputProps) {
    return (
        <div className="w-full">
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
        </div>
    )
}