'use server';

import { caller } from "@/trpc/server";



interface saveProgressProps {
  isCorrect: boolean;
  lessonId: string;
  unitId: string;
  lastquestionAnswer: number;
}

export const saveProgress = async ({ isCorrect, lessonId, unitId, lastquestionAnswer }: saveProgressProps) => {
  await caller.lesson.saveProgress({
    lessonId,
    unitId,
    lastquestionAnswer,
    isCorrect
  })
}
