import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <div className="page-container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
