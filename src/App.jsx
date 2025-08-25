import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Library from "./pages/Library";
import MethodDetail from "./pages/MethodDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="library" element={<Library />} />
        <Route path="library/:methodId" element={<MethodDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
