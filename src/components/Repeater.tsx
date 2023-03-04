import { useState, useRef, useEffect } from "react";
import RepeaterButton from "./RepeaterButton";

type FieldItem = { id: string; component: JSX.Element };

const genericBtnClassName =
  "mx-4 px-4 py-2 rounded-md text-sm font-medium border shadow focus:outline-none focus:ring transition text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300";

const Repeater = ({
  component,
  enableRemove,
  clearAll,
  getRepeaterState,
}: {
  component: JSX.Element;
  enableRemove: boolean;
  clearAll: boolean;
  getRepeaterState: any;
}): JSX.Element => {
  const [fields, setFields] = useState([]);

  const repeatedElements = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log("state updated: ", { fields });
    getRepeaterState(fields, repeatedElements);
  }, [fields, getRepeaterState]);

  const handleOnclick = (eventType: string) => {
    if (eventType === "add") {
      setFields((fields): any => [
        ...fields,
        {
          id: Math.floor(Math.random() * 1000000) + "",
          component,
        },
      ]);
    }

    eventType === "clearAll" && setFields([]);
  };

  const handleRemoveItem = (itemId: string) => {
    const filteredItems = fields.filter(
      (item: FieldItem) => item.id !== itemId
    );
    setFields(filteredItems);
  };

  return (
    <div className="App">
      <form ref={repeatedElements}>
        <RepeaterButton
          className={genericBtnClassName}
          btnText="Add"
          onClick={() => handleOnclick("add")}
          type="button"
        />
        {!clearAll && (
          <RepeaterButton
            className={genericBtnClassName}
            btnText="Clear all"
            onClick={() => handleOnclick("clearAll")}
            type="button"
          />
        )}
        {fields.map((item: any) => {
          return (
            <div key={item.id} className="mx-4">
              {item.component}
              {!enableRemove && (
                <RepeaterButton
                  className={`ml-4 my-4 ${genericBtnClassName}`}
                  btnText="Remove"
                  onClick={() => handleRemoveItem(item.id)}
                  type="button"
                />
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Repeater;
