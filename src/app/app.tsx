import { Header } from "../common/components/header/header";
import { AppRouter } from "../routes/app.router";
import "./app.css";

export type MenuOptions = {
  id: string;
  label: string;
  path: string;
};

export default function App() {
  return (
    <>
      <Header></Header>
      <AppRouter></AppRouter>
    </>
  );
}
