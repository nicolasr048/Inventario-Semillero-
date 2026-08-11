import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inventario Semillero',
  description: 'Sistema de Gestión de Inventario para Semillero de Investigación',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
