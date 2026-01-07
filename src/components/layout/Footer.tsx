export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} User Management System</p>
          <p className="text-xs">
            Built with React, TypeScript & Redux Toolkit
          </p>
        </div>
      </div>
    </footer>
  );
}
