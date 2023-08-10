"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Control() {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${params.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/");
        router.refresh();
      });
  };

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {params.id && (
        <>
          <li>
            <Link href={`/update/${params.id}`}>Update</Link>
          </li>
          <li>
            <input type="button" value="delete" onClick={onClick} />
          </li>
        </>
      )}
    </ul>
  );
}
