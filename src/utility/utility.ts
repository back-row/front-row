export async function getAnswers(id: number) {
  const response = await fetch('http://localhost:8000/quiz/' + id);
  const data = await response.text();
  const obj = JSON.parse(data);

  const quizQuestion: {
    question: string;
    choice1: string;
    answer1: string[];
    choice2: string;
    answer2: string[];
    choice3: string;
    answer3: string[];
  } = JSON.parse(obj.quizquestion);

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
