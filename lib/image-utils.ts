/**
 * Valida si una imagen existe intentando cargarla
 * @param url URL de la imagen a validar
 * @returns Promise que resuelve a true si existe, false si no
 */
export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Valida múltiples imágenes en paralelo
 * @param urls Array de URLs de imágenes
 * @returns Promise con objeto donde key=url y value=booleano indicando si existe
 */
export async function validateImages(urls: string[]): Promise<Record<string, boolean>> {
  const results = await Promise.all(
    urls.map(async (url) => ({
      url,
      exists: await imageExists(url),
    }))
  );

  return results.reduce((acc, { url, exists }) => {
    acc[url] = exists;
    return acc;
  }, {} as Record<string, boolean>);
}
