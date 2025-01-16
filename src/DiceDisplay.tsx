import React from "react";
import { GridCoordinate } from "./types";
import { coordToString } from "./dice-utils";

interface DiceDisplayProps {
  coordinates: GridCoordinate[];
}

const DiceDisplay: React.FC<DiceDisplayProps> = ({ coordinates }) => {
  return (
    <div className="flex gap-2 mb-4">
      {coordinates.map((coord, index) => (
        <div
          key={index}
          className="w-10 h-10 flex items-center justify-center 
                     bg-gray-800 text-white font-mono rounded-lg
                     border-2 border-gray-700 shadow-md"
        >
          {coordToString(coord)}
        </div>
      ))}
    </div>
  );
};

export default DiceDisplay;
