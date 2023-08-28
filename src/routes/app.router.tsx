import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/error/error";

const GalleryPage = lazy(() => import("../pages/gallery/gallery.page"));
const AddPage = lazy(() => import("../pages/add/add.page"));
const RegisterPage = lazy(() => import("../pages/register/register.page"));
const LoginPage = lazy(() => import("../pages/login/login.page"));
const EditPage = lazy(() => import("../pages/edit/edit.page"));
const Detail = lazy(
  () => import("../features/euphonium/components/detail/detail")
);

export function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<GalleryPage></GalleryPage>}></Route>
        <Route path={"/nuevo_bombardino"} element={<AddPage></AddPage>}></Route>
        <Route
          path={"/registro"}
          element={<RegisterPage></RegisterPage>}
        ></Route>
        <Route
          path={"/iniciar_sesion"}
          element={<LoginPage></LoginPage>}
        ></Route>
        <Route
          path={"/detalles/:instrumentId"}
          element={<Detail></Detail>}
        ></Route>
        <Route
          path={"/editar/:instrumentEditId"}
          element={<EditPage></EditPage>}
        ></Route>
        <Route path={"*"} element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
