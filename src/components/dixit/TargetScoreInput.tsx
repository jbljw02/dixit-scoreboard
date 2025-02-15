import { useState } from 'react';
import CommonInput from '../common/CommonInput';

interface TargetScoreInputProps {
    targetScore: number;
    onTargetScoreChange: (newScore: number) => void;
}

export default function TargetScoreInput({ targetScore, onTargetScoreChange }: TargetScoreInputProps) {
    const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);

    const targetScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1) {
            onTargetScoreChange(value);
        }
    };

    return (
        <div className="flex items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow-md">
            <span className="text-orange-600 font-medium whitespace-nowrap">
                승리 조건 점수:
            </span>
            {/* 점수를 편집하고 있는지에 따라 분기 */}
            {
                isEditingTarget ? (
                    <CommonInput
                        type="number"
                        value={targetScore}
                        onChange={targetScoreChange}
                        onBlur={() => setIsEditingTarget(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setIsEditingTarget(false);
                        }}
                        autoFocus={true}
                        className="h-[35px]" />
                ) :
                    (
                        <div
                            className="flex items-center gap-1.5 cursor-pointer group"
                            onClick={() => setIsEditingTarget(true)}>
                            <span className="text-orange-500 group-hover:text-orange-600 transition-colors">
                                {targetScore}점
                            </span>
                            <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    )
            }
        </div>
    );
}