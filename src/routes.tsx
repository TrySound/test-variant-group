import { createBrowserRouter } from "react-router";
import { Layout, layoutLoader } from "./pages/layout";
import { Applications, applicationsLoader } from "./pages/applications";
import { Generator, generatorLoader, generatorAction } from "./pages/generator";
import { deleteCoverLetter } from "./lib/cover-letters-storage";
import { redirect } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: layoutLoader,
    children: [
      {
        index: true,
        Component: Applications,
        loader: applicationsLoader,
      },
      {
        path: "generator",
        Component: Generator,
        loader: generatorLoader,
        action: generatorAction,
      },
      {
        path: "generator/:id",
        Component: Generator,
        loader: generatorLoader,
        action: generatorAction,
      },
    ],
  },
  {
    path: "/delete/:id",
    action: async ({ params }) => {
      if (params.id) {
        deleteCoverLetter(params.id);
      }
      return redirect("/");
    },
  },
]);
