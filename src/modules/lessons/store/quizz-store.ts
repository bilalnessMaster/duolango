import { Lesson, Option, Progress, Question, User } from '@/generated/prisma';
import { create } from 'zustand';
import { refill, saveProgress } from '../utits';

interface Props {
  rightAnswers: number;
  user: User | undefined;
  lessonIsCompleted: boolean;
  progress: Progress | undefined;
  increment: number;
  setProgress: (progress: Progress) => void;
  question: Question & { options: Option[] } | undefined;
  lesson: Lesson & { question: (Question & { options: Option[] })[] } | undefined;
  setLesson: (
    lesson: Lesson & { question: (Question & { options: Option[] })[] },
    progress: Progress,
    user: User
  ) => void,
  nextQuestion: () => void;
  setIsCorrect: (value: boolean) => void;
  isCorrect: boolean;
  checked: boolean;
  checkOption: () => void;
  optionCheck: () => void;
  Loading: boolean;
  refresh: () => void;
}

export const useQuizzStore = create<Props>((set, get) => ({
  rightAnswers: 0,
  user: undefined,
  lessonIsCompleted: false,
  progress: undefined,
  isCorrect: false,
  lesson: undefined,
  Loading: false,
  increment: 1,
  checked: true,
  question: undefined,
  refresh: () => {
    set({
      user: undefined,
      lessonIsCompleted: false,
      progress: undefined,
      isCorrect: false,
      lesson: undefined,
      Loading: false,
      increment: 1,
      checked: true,
      question: undefined,

    })
  },
  setProgress: (progress) => set({ progress }),
  setLesson: (lesson, progress, user) => {
    set({ lesson, question: lesson?.question?.[0], progress, user })
  },
  nextQuestion: () => {
    const { lesson, increment } = get()

    if (lesson?.question && increment < lesson?.question?.length) {
      const nxtQuestion = lesson?.question[increment]
      set({
        question: nxtQuestion,
        increment: increment + 1,
        checked: true,
        Loading: false
      })
    }
  },
  setIsCorrect: (value) => set({ isCorrect: value }),
  checkOption: async () => {

    const { isCorrect, lesson, rightAnswers, question, progress } = get();
    set({ Loading: true })
    if (isCorrect) {
      set({ rightAnswers: rightAnswers + 1 })
    }
    let checkifCompleted = question?.order === lesson?.question.length
    // console.log("is the lesson completed ", checkifCompleted)
    await saveProgress({
      lessonId: lesson?.id!!,
      unitId: lesson?.unitId!!,
      lastquestionAnswer: question?.order!!,
      isCorrect,
      completed: !!checkifCompleted
    })



    let updateProgress: Progress

    if (progress) {
      updateProgress = {
        ...progress,
        lastQuestionAnswered: question?.order!!,
        hearts: !isCorrect && progress ? progress?.hearts - 1 : progress?.hearts,
        points: isCorrect && progress ? progress?.points + 1 : progress?.points,
      }
      set({ progress: updateProgress })
    }

    if (checkifCompleted) {
      set({ lessonIsCompleted: true })
    }

    set({ checked: false, Loading: false })
  },
  optionCheck: async () => {

    const { isCorrect, lesson, rightAnswers, question, progress } = get();
    set({ Loading: true })
    if (isCorrect) {
      set({ rightAnswers: rightAnswers + 1 })
    }
    let checkifCompleted = question?.order === lesson?.question.length
    // console.log("is the lesson completed ", checkifCompleted)
    if (checkifCompleted && progress && progress.hearts < 5) {
      await refill({
        completed: !!checkifCompleted
      })
    }
    let updateProgress: Progress

    if (progress) {
      updateProgress = {
        ...progress,
        lastQuestionAnswered: question?.order!!,
      }
      set({ progress: updateProgress })
    }

    if (checkifCompleted) {
      set({ lessonIsCompleted: true })
    }

    set({ checked: false, Loading: false })
  },
}))
