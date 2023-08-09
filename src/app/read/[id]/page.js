export default async function Read({ params }) {
  // id값을 url에 반영하여 데이터를 가지고 온다.
  const response = await fetch(`http://localhost:9999/topics/${params.id}`);
  const topic = await response.json();

  return (
    <>
      <h2>{`${topic.id}: ${topic.title}`}</h2>
      <p>{topic.body}</p>
    </>
  );
}
