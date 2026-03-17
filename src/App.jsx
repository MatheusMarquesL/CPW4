import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import { useState, useEffect } from "react";
import { Trash2, Moon, Sun, Pencil, Save, CalendarDays } from "lucide-react";
import "../src/Style.scss";
import errorIcon from "./assets/pare.png";
import { useNavigate } from "react-router-dom";
import pokeball from "./assets/bola.png"

function App() {
  const navigate = useNavigate()
  const [features, setFeatures] = useState([
    { id: 1, title: "Adicionar itens" },
    { id: 2, title: "Alterar cores da página" },
    { id: 3, title: "Organizar layout visualmente" },
  ]);

  const [newFeature, setNewFeature] = useState("");

  function handleAddFeature() {
    if (newFeature.trim() === "") return;
    const newItem = {
      id: Date.now(),
      title: newFeature,
    };

    setFeatures([...features, newItem]);
    setNewFeature("");
  }

  const [themeColor, setThemeColor] = useState("blue");

  function handleDelete(id) {
    const filtered = features.filter((feature) => feature.id !== id);
    setFeatures(filtered);
  }

  function renderCard(feature) {
    return (
      <div key={feature.id} className="card">
        <button className="delete-btn" onClick={() => handleDelete(feature.id)}>
          <Trash2 size={18} />
        </button>

        <p className="card-text">{feature.title}</p>

        <button className="view-btn" onClick={() => handleView(feature)}>
          Vizualizar
        </button>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)
  const [error, setError] = useState("")

  function handleView(feature) {
    setSelectedFeature(feature);
    setEditedText(feature.title);
    setIsModalOpen(true);
    setIsEditing(false);
    setError("")
  }

  function handleSaveEdit() {
    if(editedText.trim() === "") {
      setError("Preencha o campo")
      return;
    }
    setError("")

    const updated = features.map((feature) =>
      feature.id === selectedFeature?.id
        ? { ...feature, title: editedText }
        : feature,
    );

    setFeatures(updated);

    setSelectedFeature({
      ...selectedFeature,
      title: editedText,
    });

    setIsEditing(false);
  } 

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-body");
    } else {
      document.body.classList.remove("dark-body");
    }
  }, [darkMode]);

  return (
    <>
      <div className={`container ${themeColor}`}>
        <h1>Painel de Funcionalidades</h1>

        <div className="input-area">
          <input
            type="text"
            placeholder="Digite uma nova funcionalidade"
            value={newFeature}
            maxLength={900}
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <button onClick={handleAddFeature}>Adicionar</button>
        </div>

        <div className="theme-buttons">
          <button onClick={() => setThemeColor("blue")}>Azul</button>
          <button onClick={() => setThemeColor("green")}>Verde</button>
          <button onClick={() => setThemeColor("purple")}>Roxo</button>
          <button
            className={`icon-button dark-toggle ${darkMode ? "dark-active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
          className="icon-button"
          onClick={() => navigate("/pokedex")}
          >
            <img src={pokeball} alt="pokedex" />
          </button>
        </div>

        <div className="card-container">{features.map(renderCard)}</div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Detalhes da Funcionalidade</h2>

            <div className="modal-text">
              {isEditing ? (
                <>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                />

                {error && (
                <div className="error-message">
                    <img src={errorIcon} alt="erro" />
                    <p>{error}</p>
                  </div>
                )}
                </>
              ) : (
                <p>{selectedFeature?.title}</p>
              )}
            </div>

            {showCalendar && (
             <div style={{ margin: "15px 0" }}>
              <Calendar onChange={setDate} value={date} />
              <p>Data selecionada: {date.toLocaleDateString()}</p>
            </div>
            )}

            <div className="modal-buttons">
              {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <Pencil size={16} /> Editar
                </button>
              )}

              {isEditing && (
                <button onClick={handleSaveEdit}>
                  <Save size={16} />
                  Salvar
                </button>
              )}

              <button onClick={() => setShowCalendar(!showCalendar)}>
                <CalendarDays size={16}/> Data
              </button>

              <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
