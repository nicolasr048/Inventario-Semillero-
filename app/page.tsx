export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-block p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
          ✓ Servidor Activo
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Inventario Semillero
        </h1>
        <p className="text-slate-400 text-lg">
          El servidor de Next.js está corriendo correctamente. Se ha inicializado la estructura base en la carpeta <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono">app/</code>.
        </p>
      </div>
    </main>
  );
}
