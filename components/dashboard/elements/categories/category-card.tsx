export default function CategoryCard({ category }: { category: string }) {
  return (
    <div className="w-1/2 lg:w-1/4 p-2">
      <div className="p-3 lg:p-6 h-full hover:bg-gray-800 rounded cursor-pointer">
        <h2 className="text-lg font-bold mb-1">{category}</h2>
        <p className="text-sm lg:text-base text-gray-600">
          Descrição ou detalhes adicionais aqui.
        </p>
      </div>
    </div>
  );
}
