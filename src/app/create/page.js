"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  // 클라이언트 컴포넌트에서만 쓸 수 있는 것인데, 생성하면 그 생성한 페이지로 리다이렉션 해주는 것이다.
  // nextjs 13 부터는 app router를 사용하는데, 이는 next/router 가 아닌 next/navigation 에서 꼭 가져와야 한다.
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        /*
          기본적으로 웹이 동작하는 방법이 서버쪽으로 input 데이터를 전송해야 하기 때문에 페이지가 전환된다.
          이를 방지하기 위해 아래의 함수를 호출한다. 기본적인 동작을 막는 것이다.
        */
        e.preventDefault();
        // e.target.title 하면 name이 title인 요소를 가져올 수 있다.
        // 혹은 첫번째 요소를 가져오고 싶으면 e.target[0] 이렇게 할 수 있다.
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        const response = await fetch("http://localhost:9999/topics", options);
        const result = await response.json();
        router.push(`/read/${result.id}`);
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
