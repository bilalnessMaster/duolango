import { useQuizzStore } from "../store/quizz-store"



export const useLesson = () => {
  const { setIsCorrect, Loading, checkOption, isCorrect, question, progress, nextQuestion, setLesson, checked } = useQuizzStore();

  return {
    Loading,
    setIsCorrect,
    isCorrect,
    checked,
    checkOption,
    question,
    progress,
    nextQuestion,
    setLesson,
  }
}
