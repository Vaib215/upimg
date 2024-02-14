export default function Layout({
  children,
  uploader,
  files,
}: {
  children: React.ReactNode
  uploader: React.ReactNode
  files: React.ReactNode
}) {
  return (
    <>
      {children}
      <main className="grid lg:grid-cols-2 min-h-screen">
      {uploader}
      {files}
      </main>
    </>
  )
}