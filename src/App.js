import FileUploaderBox from './components/FileUploaderBox'
import UploadedImg from './components/UploadedImg'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FileUploaderBox/>,
  },
  {
    path: "/:id",
    element: <UploadedImg/>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
