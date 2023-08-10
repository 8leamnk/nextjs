"use client";

import { useEffect, useState } from "react";

export default function Inputs({ values, buttonValue = "create" }) {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (values) {
      setInputs({ ...inputs, ...values });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={inputs.title || ""} // inputs.title이 undefined일 때를 대비해야 한다고 warning이 뜸
          onChange={onChange}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={inputs.body || ""}
          onChange={onChange}
        />
      </p>
      <p>
        <input type="submit" value={buttonValue} />
      </p>
    </>
  );
}
