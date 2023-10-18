export async function getAnswers(id: number) {
  const response = await fetch('http://localhost:8000/quiz/' + id);
  const data = await response.json();

  const quizQuestion = JSON.parse(data.quizquestion);

  return quizQuestion;
}
export async function getNumberOfMaps() {
  const response = await fetch('http://localhost:8000/map/count');
  const data = await response.text();

  return data;
}

export async function getHighScore() {
  const response = await fetch('http://localhost:8000/score');
  const data = await response.json();

  return data;
}
