import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Card.css'

const Card = (props) => {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const updateCount = (e) => {
    e.stopPropagation()
    setCount((c) => c + 1)
  }

  return (
    <div className={`card ${props.element?.toLowerCase()}`}>

      <div>
        <h2 className="title">{props.name}</h2>
        <h3 className="author">{props.element}</h3>
        <p className="description">{props.specialty}</p>
        <p className="description">{props.skill}</p>
      </div>

      <button onClick={() => navigate(`/edit`)}>
        Edit
      </button>

    </div>
  )
}

export default Card