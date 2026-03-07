export function generateOptions(question) {
  const shuffled = [...question.distractions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const options = [question.answer, ...shuffled]
    .sort(() => 0.5 - Math.random());

  return options;
}