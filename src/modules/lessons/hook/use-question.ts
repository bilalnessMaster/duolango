import { useQuizzStore } from "../store/quizz-store"



export const useLesson = () => {
  const { refresh, user, lesson, lessonIsCompleted, setIsCorrect, Loading, checkOption, isCorrect, rightAnswers , question, progress, nextQuestion, setLesson, checked } = useQuizzStore();

  return {
    rightAnswers,
    refresh,
    user,
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
