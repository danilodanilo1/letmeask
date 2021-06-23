import firebase from 'firebase'
import copyImg from '../assets/images/copy.svg'
import '../styles/roomCode.scss'


type RoomCodeProps = {
    code:string
}
export function RoomCode(props: RoomCodeProps) {

    function copy(){
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button onClick={copy} className="room-code">
            <div>
                <img src={copyImg} alt="copy room code"/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
