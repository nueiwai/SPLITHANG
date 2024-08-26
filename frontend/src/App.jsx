import { Button } from "flowbite-react";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-blue-600 font-bold">Hello!</h1>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button color="blue">Blue</Button>
      </div>
    </>
  );
}

export default App;
