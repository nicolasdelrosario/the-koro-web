type PageNumber = number | "ellipsis";

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

/**
 * Genera un array de números de página con elipsis cuando es necesario
 * @param config - Configuración de paginación
 * @returns Array de números de página o "ellipsis"
 */
export function generatePageNumbers({
  currentPage,
  totalPages,
  maxVisiblePages = 7,
}: PaginationConfig): PageNumber[] {
  const pages: PageNumber[] = [];

  // Si hay pocas páginas, mostrar todas
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Siempre mostrar la primera página
  pages.push(1);

  // Calcular el rango de páginas visibles alrededor de la actual
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  // Agregar elipsis inicial si es necesario
  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  // Agregar páginas del rango
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Agregar elipsis final si es necesario
  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  // Siempre mostrar la última página
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Obtiene el número de página siguiente sin exceder el límite
 */
export function getNextPage(currentPage: number, totalPages: number): number {
  return Math.min(totalPages, currentPage + 1);
}

/**
 * Obtiene el número de página anterior sin bajar de 1
 */
export function getPreviousPage(currentPage: number): number {
  return Math.max(1, currentPage - 1);
}
