// src/services/simulations.js

export const runForceSimulation = (mass, force) => {
  const acceleration = (force / mass).toFixed(2);
  const isHigh = acceleration > 10;
  
  return {
    acceleration: `${acceleration} m/s²`,
    feedback: isHigh 
      ? "⚠️ ¡Cuidado! Esta aceleración es muy alta. En la vida real podría ser peligrosa."
      : "✅ Buen equilibrio entre masa y fuerza. Observa cómo cambia si modificas la masa.",
    safe: !isHigh
  };
};

export const runFinancialSimulation = (initial, rate, years) => {
  const final = initial * Math.pow((1 + rate/100), years);
  const interest = final - initial;
  
  return {
    finalAmount: `$${final.toFixed(2)}`,
    interestEarned: `$${interest.toFixed(2)}`,
    growth: `${((final/initial - 1) * 100).toFixed(1)}%`,
    tip: interest > initial ? "🎉 ¡Duplicaste tu inversión!" : "📈 Sigue así para ver crecimiento compuesto"
  };
};