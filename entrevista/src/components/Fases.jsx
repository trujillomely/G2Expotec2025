import React, { useState, useEffect } from "react";
import "../App.css";

// Fases con diferentes tipos de preguntas
const fases = [
  {
    nombre: "Pre-entrevista",
    preguntas: [
      { tipo: "texto", texto: "¿Cuál es tu nombre?" },
      { tipo: "texto", texto: "¿Cuál es tu objetivo en esta entrevista?" }
    ]
  },
  {
    nombre: "Entrevista Técnica",
    preguntas: [
      {
        tipo: "seleccion",
        texto: "¿Qué lenguaje dominas?",
        opciones: ["JavaScript", "Python", "C#", "Java"]
      },
      {
        tipo: "radio",
        texto: "¿Conoces React?",
        opciones: ["Sí", "No"]
      }
    ]
  },
  {
    nombre: "Entrevista Psicológica",
    preguntas: [
      { tipo: "texto", texto: "¿Cómo manejas el estrés?" },
      { tipo: "texto", texto: "¿Qué haces en tu tiempo libre?" }
    ]
  },
  {
    nombre: "Entrevista Final",
    preguntas: [
      { tipo: "texto", texto: "¿Tienes alguna duda?" },
      { tipo: "texto", texto: "¿Por qué deberíamos contratarte?" }
    ]
  }
];

const EntrevistaFases = () => {
  const [faseActual, setFaseActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [errores, setErrores] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setFaseActual(data.faseActual || 0));
  }, []);

  const handleRespuesta = (faseIndex, preguntaIndex, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [`${faseIndex}-${preguntaIndex}`]: valor
    }));
  };

  const validarRespuestas = () => {
    const preguntas = fases[faseActual].preguntas;
    const erroresTemp = [];

    preguntas.forEach((_, i) => {
      const valor = respuestas[`${faseActual}-${i}`];
      if (!valor || valor.trim() === "") {
        erroresTemp.push(i);
      }
    });

    setErrores(erroresTemp);
    return erroresTemp.length === 0;
  };

  const avanzar = () => {
    if (!validarRespuestas()) return;

    const nuevaFase = faseActual + 1;

    if (nuevaFase >= fases.length) {
      setMostrarResumen(true);
      return;
    }

    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ faseActual: nuevaFase })
    }).then(() => {
      setFaseActual(nuevaFase);
      setErrores([]);
    });
  };

  const retroceder = () => {
    const nuevaFase = faseActual - 1;
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ faseActual: nuevaFase })
    }).then(() => {
      setFaseActual(nuevaFase);
      setErrores([]);
    });
  };

  if (mostrarResumen) {
    return (
      <div className="container">
        <h2>Resumen de Respuestas</h2>
        {fases.map((fase, i) => (
          <div key={i}>
            <h3>{fase.nombre}</h3>
            {fase.preguntas.map((p, j) => (
              <p key={j}>
                <strong>{p.texto}:</strong>{" "}
                {respuestas[`${i}-${j}`] || <em>(No respondida)</em>}
              </p>
            ))}
          </div>
        ))}
        <button className="anterior" onClick={() => setMostrarResumen(false)}>
          Volver
        </button>
      </div>
    );
  }

  const fase = fases[faseActual];
  const progreso = ((faseActual + 1) / fases.length) * 100;

   
  return (
    <div className="container">
        <div className="progreso-container">
            <div
                className="progreso-barra"
                style={{ width: `${progreso}%` }}
            ></div>
        </div>

      <h1>Fase {faseActual + 1}: {fase.nombre}</h1>

      <div className="preguntas">
        {fase.preguntas.map((pregunta, i) => {
          const key = `${faseActual}-${i}`;
          const valor = respuestas[key] || "";

          return (
            <div key={i} style={{ marginBottom: 15 }}>
              <label>{pregunta.texto}</label>
              {pregunta.tipo === "texto" && (
                <input
                  type="text"
                  className={`campo ${errores.includes(i) ? "error" : ""}`}
                  value={valor}
                  onChange={(e) => handleRespuesta(faseActual, i, e.target.value)}
                />
              )}

              {pregunta.tipo === "seleccion" && (
                <select
                  className={`campo ${errores.includes(i) ? "error" : ""}`}
                  value={valor}
                  onChange={(e) => handleRespuesta(faseActual, i, e.target.value)}
                >
                  <option value="">-- Selecciona --</option>
                  {pregunta.opciones.map((op, idx) => (
                    <option key={idx} value={op}>{op}</option>
                  ))}
                </select>
              )}

              {pregunta.tipo === "radio" && (
                <div>
                  {pregunta.opciones.map((op, idx) => (
                    <label key={idx} style={{ display: "block" }}>
                      <input
                        type="radio"
                        name={key}
                        value={op}
                        checked={valor === op}
                        onChange={() => handleRespuesta(faseActual, i, op)}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}

              {errores.includes(i) && (
                <div className="error-text">Esta pregunta es obligatoria</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="botones">
        <button
          className="anterior"
          onClick={retroceder}
          disabled={faseActual === 0}
        >
          Anterior
        </button>

        <button className="siguiente" onClick={avanzar}>
          {faseActual === fases.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};


export default EntrevistaFases;
