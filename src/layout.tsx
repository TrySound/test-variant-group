import { Outlet, useLoaderData } from "react-router";
import { AppHeader } from "./organisms/app-header";
import { getCoverLetters, MAX_APPLICATIONS } from "./lib/cover-letters-storage";

export function layoutLoader() {
  const letters = getCoverLetters();
  return { count: letters.length };
}

export function Layout() {
  const { count } = useLoaderData<typeof layoutLoader>();

  return (
    <>
      <div className="page">
        <AppHeader
          currentApplications={Math.min(count, MAX_APPLICATIONS)}
          totalApplications={MAX_APPLICATIONS}
        />
        <Outlet />
      </div>
    </>
  );
}
