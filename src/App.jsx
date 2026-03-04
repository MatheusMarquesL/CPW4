
import { useState } from 'react'
import {Trash2} from "lucide-react"
import './App.css'

function App() {
 const [features, setFeatures] = useState([
  { id: 1, title: "Adicionar itens" },
  { id: 2, title: "Alterar cores da página" },
  { id: 3, title: "Organizar layout visualmente" }
 ])

 const [newFeature, setNewFeature] = useState("")

 function handleAddFeature() {
  if (newFeature.trim() === "") return
  const newItem = {
    id: Date.now(),
    title: newFeature
  }

  setFeatures([...features, newItem])
  setNewFeature("")
 }

 const [themeColor, setThemeColor] = useState("blue")

 function handleDelete(id) {
  const filtered = features.filter(feature => feature.id !== id)
  setFeatures(filtered)
 }

 function renderCard(feature) {
    return (
      <div key={feature.id} className='card'>
        <button 
        className='delete-btn'
        onClick={() => handleDelete(feature.id)}
        >
          <Trash2 size={18} />
        </button>

        <p className='card-text'>
          {feature.title}
        </p>

        <button className='view-btn'
        onClick={() => handleView(feature)}
        >
          Vizualizar
        </button>
      </div>
    )
 }

 const [isModalOpen, setIsModalOpen] = useState(false)
 const [selectedFeature, setSelectedFeature] = useState(null)

 function handleView (feature) {
  setSelectedFeature(feature)
  setIsModalOpen(true)
 }

 return (
  <>
  <div className={`container ${themeColor}`}>
    <h1>Painel de Funcionalidades</h1>

    <div className='input-area'>
      <input type="text"
      placeholder='Digite uma nova funcionalidade'
      value={newFeature}
      onChange={(e) => setNewFeature(e.target.value)} />
      <button onClick={handleAddFeature}>Adicionar</button>
    </div>

    <div className='theme-buttons'>
      <button onClick={() => setThemeColor("blue")}>Azul</button>
      <button onClick={() => setThemeColor("green")}>Verde</button>
      <button onClick={() => setThemeColor("purple")}>Roxo</button>
    </div>

    <div className='card-container'>
      {features.map(renderCard)}
    </div>
  </div>

  {isModalOpen && (
    <div className='modal-overlay'>
      <div className='modal'>
          <h2>Detalhes da Funcionalidade</h2>
          <p>{selectedFeature?.title}</p>

          <button onClick={() => setIsModalOpen(false)}>
            Fechar
          </button>
      </div>
    </div>
  )}
  </>
 )
}

export default App
