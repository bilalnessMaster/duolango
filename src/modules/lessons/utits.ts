'use server';

import { caller } from "@/trpc/server";



interface saveProgressProps {
  isCorrect: boolean;
  lessonId: string;
  unitId: string;
  lastquestionAnswer: number;
  completed: boolean;
}

export const saveProgress = async ({ isCorrect, lessonId, unitId, lastquestionAnswer, completed }: saveProgressProps) => {
  await caller.lesson.saveProgress({
    lessonId,
    unitId,
    lastquestionAnswer,
    isCorrect,
    completed
  })
}
export const refill = async ({ completed }: { completed: boolean }) => {
  await caller.relesson.saveProgress({
    completed
  })
}
