import { useAppSelector } from '../../../store/hooks';
import { TABLE_STYLE } from './constant/styles';

export default function PlayerColumn() {
    const isGameStarted = useAppSelector(state => state.isGameStarted);
    const players = useAppSelector(state => state.players);

    return (
        <table className={`border-collapse text-sm overflow-hidden
            ${!isGameStarted && 'flex-1'}`}>
            <thead>
                <tr>
                    <th className={`${TABLE_STYLE.th} min-w-[80px]
                        ${!isGameStarted && 'text-base'}`}>플레이어</th>
                    {
                        isGameStarted && (
                            <th className={`${TABLE_STYLE.th} min-w-[50px]`}>총점</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    players.map((player) => (
                        <tr key={player.id}>
                            {/* 플레이어명 */}
                            <td className={`${TABLE_STYLE.td} max-w-[90px] overflow-hidden
                                ${!isGameStarted && 'px-2 py-3 text-base'}`}>
                                <div className="truncate text-center">
                                    {player.name}
                                </div>
                            </td>
                            {/* 총점 */}
                            {
                                isGameStarted && (
                                    <td className={`${TABLE_STYLE.td} font-semibold text-center`}>
                                        {player.totalScore}
                                    </td>
                                )
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}