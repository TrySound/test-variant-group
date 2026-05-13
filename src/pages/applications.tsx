import { useLoaderData, Link, useFetcher } from "react-router";
import { Icon } from "../atoms/icon";
import { CtaGoal } from "../organisms/cta-goal";
import { getCoverLetters } from "../lib/cover-letters-storage";
import { MAX_APPLICATIONS } from "./layout";
import { ButtonCopy } from "../organisms/button-copy";

export function applicationsLoader() {
  const letters = getCoverLetters();
  return { letters };
}

export function Applications() {
  const { letters } = useLoaderData<typeof applicationsLoader>();
  const fetcher = useFetcher();

  const handleDelete = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/delete/${id}`,
    });
  };

  return (
    <main className="applications-page">
      <header className="page-header">
        <h1 className="page-header-title text-heading-1">Applications</h1>
        <Link to="/generator" className="button button--primary">
          <Icon name="plus" />
          Create New
        </Link>
      </header>

      {letters.length === 0 ? (
        <section className="cta" aria-label="Create New Application">
          <div className="cta-content">
            <h2 className="text-heading-2">No applications yet</h2>
            <p>
              Create your first cover letter to get started on your job search
              journey.
            </p>
          </div>
        </section>
      ) : (
        <section className="applications-grid" aria-label="Applications">
          {letters.map((letter) => (
            <article key={letter.id} className="card">
              <Link
                className="card-content card-content--collapsed"
                to={`/generator/${letter.id}`}
              >
                {letter.generatedText}
              </Link>
              <div className="card-actions">
                <button
                  className="button"
                  // @ts-ignore
                  commandfor={`applications-delete-${letter.id}`}
                  command="toggle-popover"
                >
                  <Icon name="trash" />
                  Delete
                </button>
                <div
                  id={`applications-delete-${letter.id}`}
                  popover="auto"
                  className="popover"
                >
                  <div className="card card--floating">
                    <div className="card-content">Delete this application?</div>
                    <div className="card-actions">
                      <button
                        className="button"
                        // @ts-ignore
                        commandfor={`applications-delete-${letter.id}`}
                        command="hide-popover"
                        onClick={() => handleDelete(letter.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="button"
                        // @ts-ignore
                        commandfor={`applications-delete-${letter.id}`}
                        command="hide-popover"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <ButtonCopy text={letter.generatedText} />
              </div>
            </article>
          ))}
        </section>
      )}

      {0 < letters.length && letters.length < MAX_APPLICATIONS && (
        <CtaGoal current={letters.length} total={MAX_APPLICATIONS} />
      )}
    </main>
  );
}
