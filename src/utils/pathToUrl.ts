export const pathToUrl = (path: string) => {
  let base = `https://oqu2l1irpl5kmokr.public.blob.vercel-storage.com/${path}`

  if (!path.includes(".")) {
    base += ".webp"
  }

  return base
}
