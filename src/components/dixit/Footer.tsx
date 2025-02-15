import useGameState from "../../hooks/dixit/useGameState";
import CommonButton from "../common/CommonButton";

export default function Footer() {
    const { restartGame } = useGameState();
    return (
        <div className="flex gap-4 p-4 w-full">
            <CommonButton
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 bg-orange-400">
                새 게임
            </CommonButton>
            <CommonButton
                type="button"
                onClick={restartGame}
                className="flex-1 py-2.5 bg-orange-400">
                게임 다시 시작
            </CommonButton>
        </div>
    )
}