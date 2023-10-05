export async function getAnswers() {
  const response = await fetch('http://localhost:8000/quiz/1');
  const data = await response.text();
  const obj = JSON.parse(data);
  console.log('Answers: ', obj);
  return obj;
}
