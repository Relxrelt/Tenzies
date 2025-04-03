export default function Die(props: any) {
    return <button onClick={() => props.hold(props.id)} className="die-box" style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}>{props.value}</button>
}