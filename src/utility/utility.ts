export async function getAnswers() {
  const response = await fetch('http://localhost:8000/quiz/1');
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

export async function getUser() {
  const response = await fetch('http://localhost:8000/users/1');
  const data = await response.text();
  const obj = JSON.parse(data);

  return obj;
}

export async function getNumberOfMaps() {
  const response = await fetch('http://localhost:8000/map/count');
  const data = await response.text();

  return data;
}