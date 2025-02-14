import { SelectProps } from "../../types/common.type";

export default function CommonSelect({ options, placeholder, ...props }: SelectProps) {
    return (
        <div className="relative w-full">
            <select
                {...props}
                className="w-full p-2 pl-3 border border-orange-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-orange-400
                         appearance-none">
                <option value="">{placeholder}</option>
                {
                    options.map((option) => (
                        <option key={option.key} value={option.key}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
            {/* 드롭다운 화살표 */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}