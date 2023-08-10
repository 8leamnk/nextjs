"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Inputs from "@/app/Inputs";

export default function Update() {
  const [data, setData] = useState({});
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:9999/topics/${params.id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data === {}) return "";
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${params.id}`,
          options
        );
        const result = await response.json();
        setData(result);
        router.push(`/read/${result.id}`);
        router.refresh(); // 이동 후 리프레시 해야 한다. 안그러면 계속 경고 메시지가 뜬다.
      }}
    >
      <Inputs
        values={{ title: data.title, body: data.body }}
        buttonValue="Update"
      />
    </form>
  );
}

// 폴더 이름(update)와 경로 이름(/update)가 동일해야 한다!
