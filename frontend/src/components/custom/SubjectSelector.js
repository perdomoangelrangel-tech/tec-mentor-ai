export function SubjectSelector() {
  return (
    <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700/50">
      <h3 className="text-white font-semibold mb-3">Seleccionar Materia</h3>
      <select className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700">
        <option>Matemáticas</option>
        <option>Ciencias</option>
        <option>General</option>
      </select>
    </div>
  );
}