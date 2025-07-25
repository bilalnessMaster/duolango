import { useQuizzStore } from "../store/quizz-store"



export const useLesson = () => {
  const {lesson, lessonIsCompleted, setIsCorrect, Loading, checkOption, isCorrect, question, progress, nextQuestion, setLesson, checked } = useQuizzStore();

  return {
    lesson, 
    lessonIsCompleted,
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
