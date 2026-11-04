import Link from "next/link";
import { PortfolioHeader } from "@/components/PortfolioContent";

export default function NotFound() {
  return (
    <div className="hr-reading-page"><PortfolioHeader />
      <main id="main-content" className="hr-reading-main" tabIndex={-1}>
        <section className="reading-panel file-page error-page">
          <p className="file-kicker">System message / 404</p>
          <h1>File not found.</h1>
          <p>This address doesn’t point to a portfolio file.</p>
          <div className="action-row"><Link className="action" href="/">Return to desktop</Link>
            <Link className="text-link" href="/overview/">Read portfolio overview</Link></div>
        </section>
      </main>
    </div>
  );
}
