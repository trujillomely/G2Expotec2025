import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fases = [
  {
    nombre: "Pre-entrevista",
    preguntas: [
      { tipo: "texto", texto: "Nombre completo" },
      { tipo: "texto", texto: "¿Cuál es su edad?" },
      {
        tipo: "radio",
        texto: "Género",
        opciones: ["Masculino", "Femenino", "Otro"]
      },
      { tipo: "texto", texto: "¿Cuál es tu lugar de residencia actual?" },
      {
        tipo: "radio",
        texto: "¿Cuál es tu estado civil?",
        opciones: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"]
      },
      { tipo: "texto", texto: "¿Tienes hijos?, ¿Cuántos y qué edades tienen?" },
      { tipo: "texto", texto: "¿Cuántas personas viven en tu hogar actualmente?" },
      { tipo: "texto", texto: "¿Tienes tatuajes? Si es así describe su ubicación" },
      { tipo: "texto", texto: "¿Tienes pircings? Si es así describe su ubicación" },
      { tipo: "texto", texto: "¿Qué te motiva o te inspira para seguir adelante?" },
      { tipo: "texto", texto: "¿Hablas algún otro idioma?, ¿Cómo lo manejas?" },
      { tipo: "texto", texto: "¿Tienes licencia de conducir?, ¿Qué tipo?" }
    ]
  },
  {
    nombre: "Entrevista Psicológica",
    preguntas: [
      { tipo: "texto", texto: "¿Algún error importante que hayas cometido?" },
      { tipo: "texto", texto: "¿Cómo gestionas el estrés o la presión?" },
      { tipo: "texto", texto: "Describe un desafío significativo que hayas enfrentado" },
      { tipo: "texto", texto: "¿Cómo mantienes una actitud positiva ante percances?" },
      { tipo: "texto", texto: "¿Cómo reaccionas ante los fracasos?" },
      { tipo: "texto", texto: "¿Qué tipo de ambiente te hace sentir más productivo?" },
      { tipo: "texto", texto: "¿Cómo resuelves problemas complejos?" },
      { tipo: "texto", texto: "Describe un error importante que has cometido" },
      { tipo: "texto", texto: "¿Cómo manejas las críticas injustas?" },
      { tipo: "texto", texto: "¿Qué haces si no estás de acuerdo con tu superior?" },
      { tipo: "texto", texto: "¿Cómo manejas los cambios inesperados en el trabajo?" }
    ]
  },
  {
    nombre: "Experiencia Laboral",
    preguntas: [
      { tipo: "texto", texto: "¿Cuál ha sido tu mayor logro profesional o académico?" },
      { tipo: "texto", texto: "¿Cómo aseguras la calidad de tu trabajo?" },
      { tipo: "texto", texto: "Describe tu experiencia laboral más relevante" },
      { tipo: "texto", texto: "¿Qué habilidades desarrollaste en tu último empleo?" },
      { tipo: "texto", texto: "¿Cómo gestionas interrupciones en la jornada laboral?" },
      { tipo: "texto", texto: "¿Cómo organizas tus prioridades y tareas?" },
      { tipo: "texto", texto: "¿Qué estrategia usas para mantener la concentración?" },
      { tipo: "texto", texto: "¿Tenías buena relación con compañeros y jefes?" },
      { tipo: "texto", texto: "¿Cómo manejas información confidencial?" },
      { tipo: "texto", texto: "¿Manejas bien entregas urgentes de trabajo?" },
      { tipo: "texto", texto: "¿Has capacitado a otras personas?" }
    ]
  },
  {
    nombre: "Puesto y la Empresa",
    preguntas: [
      { tipo: "texto", texto: "¿Qué te atrae de esta oportunidad laboral?" },
      { tipo: "texto", texto: "¿Cómo encajan tus habilidades en este puesto?" },
      { tipo: "texto", texto: "¿Qué valor crees aportar a la empresa?" },
      { tipo: "texto", texto: "¿Cómo priorizas objetivos ante múltiples tareas?" },
      { tipo: "texto", texto: "¿Qué impacto esperas tener el primer año?" },
      { tipo: "texto", texto: "¿Qué es lo más importante en tu próximo empleo?" },
      { tipo: "texto", texto: "¿Qué expectativas tienes de nuestra empresa?" },
      { tipo: "texto", texto: "¿Cómo te adaptarías a este estilo de rol?" },
      { tipo: "texto", texto: "¿Cómo defines un entorno de trabajo ideal?" },
      { tipo: "texto", texto: "¿Cómo manejas la expectativa de tu supervisor?" },
      { tipo: "texto", texto: "¿Qué tomarías en cuenta sobre tu próximo empleo?" }
    ]
  }
];

const EntrevistaFases = () => {
  const navigate = useNavigate();
  const [faseActual, setFaseActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [errores, setErrores] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [faseActual]);

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
    setFaseActual(nuevaFase);
    setErrores([]);
  };

  const retroceder = () => {
    if (faseActual === 0) return;
    setFaseActual(faseActual - 1);
    setErrores([]);
  };

  if (mostrarResumen) {
    return (
      <div style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'EB Garamond', serif",
        color: "#18323f"
      }}>
        <h2>Gracias por completar la entrevista</h2>
        <p style={{ fontSize: "1.2rem", maxWidth: "500px", textAlign: "center", marginTop: "10px" }}>
          Tu información ha sido registrada. Pronto te contactaremos.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            backgroundColor: "#f1a523",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            color: "#18323f",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#d9991c"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f1a523"}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const fase = fases[faseActual];
  if (!fase) {
    return <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "40px" }}><h2>Error: Fase no encontrada.</h2></div>;
  }

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "40px 15px", fontFamily: "'EB Garamond', serif", color: "#18323f" }}>
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          padding: "0",
          backgroundColor: "transparent"
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            fontWeight: "700",
            color: "#18323f",
            textAlign: "left"
          }}
        >
          Fase {faseActual + 1}: {fase.nombre}
        </h1>

        {fase.preguntas.map((pregunta, i) => {
          const key = `${faseActual}-${i}`;
          const valor = respuestas[key] || "";

          return (
            <div
              key={i}
              style={{
                backgroundColor: "#18323f",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "22px",
                color: "#bdbaba",
                boxShadow: errores.includes(i) ? "0 0 8px #f1a523" : "none",
                transition: "box-shadow 0.3s",
                maxWidth: "850px",
                width: "100%",
              }}
            >
              <p style={{ fontWeight: "600", marginBottom: "10px", color: "#fff" }}>
                Pregunta {i + 1} de {fase.preguntas.length}
              </p>
              <label style={{ display: "block", marginBottom: "10px", fontSize: "1.1rem", color: "#bdbaba" }}>{pregunta.texto}</label>

              {pregunta.tipo === "texto" && (
                <input
                  type="text"
                  value={valor}
                  onChange={(e) => handleRespuesta(faseActual, i, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border: `1.5px solid ${errores.includes(i) ? "#f1a523" : "#ccc"}`,
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "1rem",
                    color: "#18323f",
                    outline: "none",
                    transition: "border-color 0.3s"
                  }}
                  placeholder="Escribe tu respuesta aquí..."
                />
              )}

              {pregunta.tipo === "radio" && pregunta.opciones && (
                <div style={{ marginTop: "6px", color: "#ffffff" }}>
                  {pregunta.opciones.map((op, idx) => (
                    <label
                      key={idx}
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        userSelect: "none",
                        color: "#ffffff"
                      }}
                    >
                      <input
                        type="radio"
                        name={key}
                        value={op}
                        checked={valor === op}
                        onChange={() => handleRespuesta(faseActual, i, op)}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}

              {errores.includes(i) && (
                <div style={{ color: "#f1a523", marginTop: "6px", fontWeight: "600" }}>
                  Esta pregunta es obligatoria
                </div>
              )}
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "35px" }}>
          <button
            onClick={retroceder}
            disabled={faseActual === 0}
            style={{
              padding: "12px 30px",
              backgroundColor: faseActual === 0 ? "#ccc" : "#f1a523",
              border: "none",
              borderRadius: "8px",
              cursor: faseActual === 0 ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              color: "#18323f",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#d9991c";
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#f1a523";
            }}
          >
            Anterior
          </button>

          <button
            onClick={avanzar}
            style={{
              padding: "12px 30px",
              backgroundColor: "#f1a523",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              color: "#18323f",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d9991c")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f1a523")}
          >
            {faseActual === fases.length - 1 ? "Finalizar" : "Siguiente"}
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#f1a523",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              color: "#18323f",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d9991c")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f1a523")}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrevistaFases;
