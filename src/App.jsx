import { BrowserRouter } from "react-router-dom"
import Quiz from "./Quiz";
const App=()=> {

    return (
      <BrowserRouter>
        <div className="">
          <Quiz />
        </div>
      </BrowserRouter>
    );
}

export default App
