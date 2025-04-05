interface DieProps {
    id: string;
    value: number;
    isHeld: boolean;
    hold: (id: string) => void;
}

export default function Die({id, value, isHeld, hold}: DieProps) {
    return <button onClick={() => hold(id)} className="die-box" style={{backgroundColor: isHeld ? "#59E391" : "white"}}>{value}</button>
}