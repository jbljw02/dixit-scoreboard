import { useState } from 'react';
import CommonInput from '../common/CommonInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTargetScore } from '../../store/features/scoreSlice';
import { keyDownEvent } from '../../utils/keyDownEvent';

export default function TargetScoreInput() {
    const dispatch = useAppDispatch();

    const targetScore = useAppSelector(state => state.targetScore);
    const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);

    // 승리 조건 점수 변경
    const targetScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        dispatch(setTargetScore(String(value)));
    };

    const targetScoreSubmit = () => {
        if (Number(targetScore) === 0) {
            return;
        }

        setIsEditingTarget(false);
    };

    // ENTER, ESC: 점수 제출 및 수정 중단
    const targetScoreKeyDownEvent = keyDownEvent({
        onEnter: targetScoreSubmit,
        onEscape: targetScoreSubmit
    });

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
                        onBlur={targetScoreSubmit}
                        onKeyDown={targetScoreKeyDownEvent}
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