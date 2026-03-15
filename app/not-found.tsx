// Root-level not-found for non-locale routes
// Renders a minimal fallback page before locale is known
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "1rem",
          background: "#fff",
          color: "#111",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>404</h1>
        <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem", color: "#555" }}>
          Page not found
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.5rem",
            background: "#111",
            color: "#fff",
            borderRadius: "0.375rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Back to home
        </a>
      </body>
    </html>
  );
}
