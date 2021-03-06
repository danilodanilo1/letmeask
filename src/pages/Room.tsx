import React, { FormEvent, useEffect, useState } from 'react'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import {useParams} from 'react-router-dom'

import '../styles/room.scss'
import { useAuth } from '../hooks/useAth'
import { database } from '../services/firebase'

type RoomParams = {
    id:string
}
type FirebaseQuestions = Record<string,{
    content: string,
    author:{
        name:string,
        avatar:string
    },
    isHighlighted:boolean,
    isAnswered:boolean
}>
type Questions = {
    id:string,
    content: string,
    author:{
        name:string,
        avatar:string
    },
    isHighlighted:boolean,
    isAnswered:boolean
}

export default function Room() {
    
    const params = useParams<RoomParams>()
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestion] = useState<Questions[]>([])
    const [title, setTitles] = useState()
    const {user} = useAuth()

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', room => {

            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value])=>{
                return{
                    id:key,
                    content:value.content,
                    author:value.author,
                    isHighlighted:value.isHighlighted,
                    isAnswered:value.isAnswered,
                }
            })
            setTitles(databaseRoom.title)
            setQuestion(parsedQuestion)
            console.log(parsedQuestion)
        })
    },[])

    async function handleSendQuestion(e: FormEvent){
        e.preventDefault()
        if(newQuestion.trim() === ''){
            return
        }

        if(!user){
            throw new Error('you must be logged in')
        }
        const question={
            content: newQuestion,
            author:{
                name:user.name,
                avatar:user.avatar
            },
            isHighlighted:false,
            isAnswered:false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} {questions.length > 1 ? 'perguntas':'pergunta'}</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea value={newQuestion} onChange={(e)=>setNewQuestion(e.target.value)} placeholder="O que voc?? quer perguntar?"/>

                    <div className="form-footer">
                        {user ? (
                          <div className="user-info" >
                             <img src={user.avatar} alt={user.name}/>
                             <span>{user.name}</span>
                          </div> 
                        ):(
                            <span>Para enviar uma pergunta, <button>fa??a seu login</button>.</span>
                        )}
                        <Button id=""type="submit" disabled={!user} >Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
