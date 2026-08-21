import { getAllComponents } from "@/lib/inventory-service";

export default async function Home() {
  const components = await getAllComponents();

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SISE Inventory</h1>
            <p className="text-gray-300 mt-1">
              Sistema inteligente de inventario
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition">
            + Agregar componente
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-8">
        <input
          type="text"
          placeholder="🔍 Buscar componente..."
          className="w-full rounded-xl border border-gray-300 bg-white p-4 text-lg shadow-sm"
        />

        <div className="grid grid-cols-4 gap-6 mt-8">
          <Card titulo="📦 Componentes" valor={components.length.toString()} />

          <Card titulo="📂 Categorías" valor="0" />

          <Card titulo="👜 Bolsas" valor="0" />

          <Card titulo="⚠ Stock bajo" valor="0" />
        </div>

        <div className="bg-white rounded-2xl shadow-md mt-10 p-8">
          <h2 className="text-2xl font-bold mb-5">
            Últimos componentes
          </h2>

          {components.length === 0 ? (
            <div className="text-gray-500">
              No hay componentes registrados.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Código</th>
                  <th className="text-left py-3">Nombre</th>
                  <th className="text-left py-3">Categoría</th>
                  <th className="text-left py-3">Cantidad</th>
                  <th className="text-left py-3">Unidad</th>
                  <th className="text-left py-3">Bolsa</th>
                </tr>
              </thead>

              <tbody>
                {components.map((component) => (
                  <tr key={component.id} className="border-b">
                    <td className="py-3">{component.codigo}</td>
                    <td>{component.nombre}</td>
                    <td>{component.categoria}</td>
                    <td>{component.cantidad}</td>
                    <td>{component.unidad}</td>
                    <td>{component.bag?.nombre ?? "Sin bolsa"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

function Card({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="text-gray-500">{titulo}</div>

      <div className="text-4xl font-bold mt-3">{valor}</div>
    </div>
  );
}
