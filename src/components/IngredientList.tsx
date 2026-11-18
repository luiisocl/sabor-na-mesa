import { useState } from 'react';
import type { Ingredient } from '../types';

// Componente 8 — Lista de ingredientes com checkbox para marcar o que já separou
export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (index: number) =>
    setChecked((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  return (
    <div className="ingredients">
      <h2>
        Ingredientes <small className="muted">({checked.length}/{ingredients.length} separados)</small>
      </h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index} className={checked.includes(index) ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} />
              <img src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}-Small.png`} alt="" loading="lazy" />
              <span>
                <strong>{item.measure}</strong> {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
