import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface category {
  _id: string;
  name: string;
  translation: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/cat')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.Category);
        console.log(data);
        console.log(categories);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex  flex-wrap gap-4 rounded m-10 bg">
      {categories.map((el, i) => (
        <Link
          to={`/game/${el._id}`}
          key={i}
          className="w-1/5 h-80 bg-blue-300 grow rounded-lg"
        >
          <div>{el.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
