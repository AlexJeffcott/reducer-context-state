import React, { Suspense, lazy, FC } from "react";
import { ListProvider } from "./listState";

export const LazyLoader = () => <div>loading</div>;
const ListPage = lazy(() => import("./listPage"));

export const App: FC = () => (
  <Suspense fallback={<LazyLoader />}>
    <ListProvider>
      <ListPage />
    </ListProvider>
  </Suspense>
);
