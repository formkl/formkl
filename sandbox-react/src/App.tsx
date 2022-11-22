import { useState } from "react";
import { createForm } from "@formkl/adapter";

const Formkl = createForm();

function App() {
  const [formklSyntax, setFormklSyntax] = useState(`formkl
  "Your Formkl example"
  "This form is generated by the formkl adapter"
{
  multiple "Soem" includes {
    require text;
  }
  "jhk" includes {
    multiple text;
    multiple text as "something";
  }
}`);

  const handleInput = (event: any) => {
    setFormklSyntax(event.target.value);
  };

  const handleChange = (value: any) => {
    console.log("Change", value);
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex-1">
        <formkl-editor value={formklSyntax} onInput={handleInput} />
      </div>
      <div className="flex-1 py-2 px-8">
        <Formkl syntax={formklSyntax} onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
