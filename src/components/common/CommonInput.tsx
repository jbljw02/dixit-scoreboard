import { InputProps } from "../../types/common.type";

export default function CommonInput({ isError, ...props }: InputProps) {
    return (
        <div className="w-full">
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
                className={`w-full px-3 py-2 border rounded-lg 
                    focus:outline-none focus:ring-1
                    transition-colors duration-200
                    ${isError
                        ? 'border-red-500 focus:ring-red-400 animate-vibrate'
                        : 'border-orange-200 focus:ring-orange-400'
                    }
                    ${props.className}`}
                autoFocus={props.autoFocus} />
        </div>
    )
}