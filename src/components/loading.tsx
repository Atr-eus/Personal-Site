export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground animate-spin"></div>
        </div>

        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
