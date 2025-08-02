import { useQuizzStore } from "@/modules/lessons/store/quizz-store";

export const useLesson = () => {
  const {refresh, user, lesson, lessonIsCompleted, setIsCorrect, Loading, optionCheck, isCorrect, rightAnswers , question, progress, nextQuestion, setLesson, checked } = useQuizzStore();

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
    checkOption : optionCheck,
    question,
    progress,
    nextQuestion,
    setLesson,
  }
}
