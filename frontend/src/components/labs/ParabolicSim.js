/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import { create, all } from 'mathjs';
import 'mathlive'; 

const math = create(all);

export const ParabolicSim = () => {
    const [latex, setLatex] = useState(""); 
    const [scale, setScale] = useState(40);  
    const [targetScale, setTargetScale] = useState(40); 
    const [offsetX, setOffsetX] = useState(100); 
    const [offsetY, setOffsetY] = useState(400);
    
    const [entorno, setEntorno] = useState({
        velocidadInicial: 50,
        angulo: 45,
        gravedad: 9.81,
        tiempo: 0
    });
    
    const [isFiring, setIsFiring] = useState(false);
    const [tAnimacion, setTAnimacion] = useState(0); 
    const [trail, setTrail] = useState([]); 

    const mathfieldRef = useRef(null);

    useEffect(() => {
        const mf = mathfieldRef.current;
        const handleChange = (e) => setLatex(e.target.value);
        if (mf) {
            mf.mathVirtualKeyboardPolicy = "manual"; 
            mf.addEventListener('input', handleChange);
        }
        return () => {
            if (mf) mf.removeEventListener('input', handleChange);
            if (window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
        };
    }, []);

    const cleanLatex = (raw) => {
        return raw
            .replace(/\\sin/g, 'sin').replace(/\\cos/g, 'cos').replace(/\\tan/g, 'tan')
            .replace(/\\pi/g, 'pi')
            .replace(/\\frac{([^}]*)}{([^}]*)}/g, "(($1)/($2))")
            .replace(/\\sqrt{([^}]*)}/g, "sqrt($1)")
            .replace(/\^/g, '^').replace(/{([^}]*)}/g, "($1)");
    };

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 500).parent(canvasParentRef);
    };

    // SOLUCIÓN AL ERROR DE ZOOM TÁCTIL/TECLADO
    const mouseWheel = (p5, event) => {
        // Solo permite el zoom si el mouse está sobre el simulador Y se presiona CTRL
        if (p5.mouseX > 0 && p5.mouseX < 800 && p5.mouseY > 0 && p5.mouseY < 500) {
            if (p5.keyIsDown(p5.CONTROL) || p5.keyIsDown(91)) { // 91 es Command en Mac
                const zoomFactor = event.delta > 0 ? 0.9 : 1.1;
                const newScale = targetScale * zoomFactor;
                setTargetScale(Math.min(Math.max(newScale, 2), 400));
                return false; // Bloquea el scroll de la página
            }
        }
        return true; // Permite el scroll normal si no se presiona CTRL
    };

    const runFire = () => {
        if (!latex) return;
        if (window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
        
        try {
            const angRad = (entorno.angulo * Math.PI) / 180;
            let maxW = (Math.pow(entorno.velocidadInicial, 2) * Math.sin(2 * angRad)) / entorno.gravedad;
            let maxH = (Math.pow(entorno.velocidadInicial * Math.sin(angRad), 2)) / (2 * entorno.gravedad);
            
            const scaleX = 650 / (maxW || 1);
            const scaleY = 380 / (maxH || 1);
            const idealScale = Math.min(scaleX, scaleY);
            setTargetScale(Math.min(Math.max(idealScale, 5), 100));
        } catch (e) {}

        setTAnimacion(0);
        setTrail([]);
        setIsFiring(true);
    };

    const draw = (p5) => {
        p5.background(10, 14, 31);
        
        if (Math.abs(scale - targetScale) > 0.01) {
            setScale(p5.lerp(scale, targetScale, 0.15));
        }

        // Arrastre del plano: Solo funciona si NO se está intentando hacer zoom (sin CTRL)
        if (p5.mouseIsPressed && p5.mouseY < 500 && p5.mouseX < 800 && !p5.keyIsDown(p5.CONTROL)) {
            setOffsetX(prev => prev + (p5.mouseX - p5.pmouseX));
            setOffsetY(prev => prev + (p5.mouseY - p5.pmouseY));
        }

        p5.push();
        p5.translate(offsetX, offsetY);
        dibujarCuadriculaDesmos(p5, scale);

        try {
            const exprCuidada = cleanLatex(latex);
            const angRad = (entorno.angulo * Math.PI) / 180;
            const tActual = isFiring ? tAnimacion : entorno.tiempo;
            const scope = { t: tActual, v0: entorno.velocidadInicial, g: entorno.gravedad, angle: angRad };
            
            const posX = scope.v0 * Math.cos(angRad) * tActual;
            const posY = (latex !== "" && latex !== " ") ? math.evaluate(exprCuidada, scope) : 0;

            p5.stroke(255, 255, 0, 150);
            p5.strokeWeight(2.5); p5.noFill();
            p5.beginShape();
            trail.forEach(p => p5.vertex(p.x * scale, -p.y * scale));
            p5.endShape();

            p5.fill(0, 255, 255); p5.noStroke();
            p5.circle(posX * scale, -posY * scale, 12);
            p5.fill(0, 255, 255, 50);
            p5.circle(posX * scale, -posY * scale, 24);

            if (isFiring) {
                if (p5.frameCount % 2 === 0) setTrail(prev => [...prev, { x: posX, y: posY }].slice(-500));
                setTAnimacion(prev => prev + 0.08);
                if (posY < -15) setIsFiring(false);
            }
        } catch (e) {}
        p5.pop();
    };

    const dibujarCuadriculaDesmos = (p5, s) => {
        let paso = 1;
        if (s < 8) paso = 50;
        else if (s < 20) paso = 10;
        else if (s < 50) paso = 5;
        else if (s < 120) paso = 2;
        else paso = 1;

        p5.stroke(255, 255, 255, 12);
        p5.strokeWeight(1);
        for (let i = -100; i <= 500; i += paso / 5) {
            p5.line(i * s, -5000, i * s, 5000);
            p5.line(-5000, i * s, 5000, i * s);
        }

        p5.textSize(11);
        for (let i = -100; i <= 500; i += paso) {
            if (i === 0) continue;
            p5.stroke(255, 255, 255, 35);
            p5.line(i * s, -5000, i * s, 5000);
            p5.line(-5000, -i * s, 5000, -i * s);
            p5.noStroke(); p5.fill(255, 160);
            p5.textAlign(p5.CENTER, p5.TOP);
            p5.text(i, i * s, 10);
            p5.textAlign(p5.RIGHT, p5.CENTER);
            p5.text(i, -10, -i * s);
        }

        p5.stroke(0, 195, 255, 150);
        p5.strokeWeight(2);
        p5.line(0, -5000, 0, 5000);
        p5.line(-5000, 0, 5000, 0);
    };

    return (
        <div className="flex flex-col w-full h-full p-4 space-y-4 bg-[#0a0e1f] text-white">
            <div className="relative border border-white/5 rounded-[2.5rem] overflow-hidden bg-[#0a0e1f] shadow-2xl">
                <Sketch setup={setup} draw={draw} mouseWheel={mouseWheel} />
                
                <div className="absolute top-6 right-6 flex flex-col space-y-3">
                    <button onClick={() => setTargetScale(prev => Math.min(prev * 1.4, 400))} className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-2xl border border-white/10 text-xl font-bold transition-all">+</button>
                    <button onClick={() => setTargetScale(prev => Math.max(prev / 1.4, 2))} className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-2xl border border-white/10 text-xl font-bold transition-all">-</button>
                    <button onClick={() => {setOffsetX(100); setOffsetY(400); setTargetScale(40);}} className="bg-blue-500/20 hover:bg-blue-500/40 px-3 py-2 rounded-xl border border-blue-400/30 text-[10px] font-black tracking-tighter">RESET 🏠</button>
                </div>

                <div className="absolute bottom-8 right-8 text-right">
                    <p className="text-[9px] text-white/30 mb-2 mr-2">Tip: Mantén CTRL + Rueda para Zoom</p>
                    <button onClick={runFire} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-12 py-5 rounded-[2rem] font-black text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all active:scale-95">
                        🚀 DISPARAR
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 bg-slate-900/40 p-7 rounded-[3rem] border border-white/5 shadow-inner">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4 ml-4">Editor de Función (t)</p>
                    <div className="bg-black/40 p-6 rounded-[2rem] border border-white/10 focus-within:border-blue-500/50 transition-colors" onClick={() => window.mathVirtualKeyboard?.show()}>
                        <math-field ref={mathfieldRef} style={{ width: '100%', background: 'transparent', color: 'white', fontSize: '26px' }} />
                    </div>
                </div>

                <div className="col-span-4 bg-slate-900/40 p-7 rounded-[3rem] border border-white/5 shadow-inner">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4 ml-4">Entorno</p>
                    <div className="space-y-3">
                        {Object.keys(entorno).map((key) => (
                            <div key={key} className="flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-all">
                                <span className="text-[11px] text-gray-400 font-bold uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <input 
                                    type="text" value={entorno[key]} 
                                    onChange={e => {
                                        const val = e.target.value;
                                        if (val === "" || !isNaN(val)) setEntorno({...entorno, [key]: val});
                                    }}
                                    className="bg-transparent text-right w-16 outline-none text-blue-400 font-black text-base"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};