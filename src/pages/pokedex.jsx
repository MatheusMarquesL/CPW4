import { useState } from "react";

function Pokedex() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  async function fetchPokemon() {
    if (name.trim() === "") {
      setError("Digite o nome de um Pokémon");
      setPokemon(null);
      return;
    }

    try {
      setError("");

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
      );

      if (!res.ok) {
        throw new Error("Pokémon não encontrado");
      }

      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    }
  }

  const statNames = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP. ATK",
    "special-defense": "SP. DEF",
    speed: "SPD",
  };

  return (
    <div>
      <h1>Pokédex</h1>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchPokemon();
          }
        }}
      />

      <button onClick={fetchPokemon}>Buscar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div className="pokedex-card">
          <div className="left">
            <div className="images">
              {pokemon.sprites.front_default && (
                <img src={pokemon.sprites.front_default} alt="frente" />
              )}

              {pokemon.sprites.back_default && (
                <img src={pokemon.sprites.back_default} alt="costas" />
              )}
            </div>
            <h2>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>

            <p>
              <strong>Tipo:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
          </div>

          <div className="right">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat">
                <span className="stat-name">{statNames[stat.stat.name]}</span>

                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{ "--width": `${Math.min(stat.base_stat, 100)}%` }}
                  ></div>
                </div>

                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>

          <div className="abilities">
            <strong>Habilidades:</strong>
            <ul>
              {pokemon.abilities?.map((a, index) => (
                <li key={index}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokedex;
