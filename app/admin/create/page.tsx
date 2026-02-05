import AdminProductForm from "@/components/admin/AdminProductForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreateProductPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-4 inline-flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver al Admin
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Crear Producto
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <AdminProductForm />
      </div>
    </main>
  );
}
