import { useState } from "react";

function SaveDropdown({ onSelectStatus, currentStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currentStatus || "");

  const handleSave = () => {
    onSelectStatus(selected);
    setIsOpen(false);
  };

  const statusColors = {
    Leer: "bg-[#FFBD00] hover:bg-yellow-600",
    Leyendo: "bg-[#FF5400] hover:bg-orange-800",
    Leídos: "bg-[#FF0054] hover:bg-pink-700",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2 py-1 min-w-[80px] md:min-w-[120px] text-sm rounded-full cursor-pointer ${
          statusColors[currentStatus] || "bg-[#9E0059] hover:bg-rose-950"
        }`}
      >
        {currentStatus || "Guardar"}
      </button>

      {isOpen && (
        <div className="absolute top-10 mt-2 left-0 bg-stone-900 rounded-md shadow-md z-10 p-3 min-w-[140px]">
          <form className="space-y-2 text-sm">
            <h3 className="font-semibold">Guardar en:</h3>
            {["Leer", "Leyendo", "Leídos"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                />
                {option}
              </label>
            ))}

            <button
              type="button"
              onClick={handleSave}
              className="mt-2 w-full text-center text-md font-semibold bg-[#ff0054] hover:bg-[#ff0054]/30 rounded-full py-1 transition cursor-pointer"
            >
              Listo
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SaveDropdown;
