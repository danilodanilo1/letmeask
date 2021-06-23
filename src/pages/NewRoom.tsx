import illustratuinImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import {useHistory} from 'react-router-dom'
// import { useAuth } from '../hooks/useAth'

export function NewRoom(){
    const history = useHistory()
    // const {user} = useAuth()
    return (
        <div id="page-auth">
            <aside>
                <img src={illustratuinImg} alt="ilustração perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} />
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="nome da sala"/>
                        <Button type="submit" >Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <a href="#" onClick={()=> history.push("/")} >Click aqui</a></p>
                </div>
            </main>
        </div>
    )
}