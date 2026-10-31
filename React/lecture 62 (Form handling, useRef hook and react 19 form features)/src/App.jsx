import ControlledComponent from "./components/ControlledComponent";
import UnControlledComponent from "./components/UnControlledComponent";
import UnControlledComponentUseRef from "./components/UnControlledComponentUseRef";


function App() {

  //yaha onInput data collect karne ke liye hai
  return (
    <div>
      <ControlledComponent/>
      <UnControlledComponent/>
      <UnControlledComponentUseRef/>
    </div>

  );
}

export default App;


