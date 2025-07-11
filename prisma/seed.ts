import prisma from "@/lib/prism";

// scripts/seed.ts
async function main() {
  // Create Spanish course
  const spanishCourse = await prisma.course.create({
    data: {
      id: 'course_es',
      title: 'Spanish',
      imageSrc: 'logos/es.svg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create units for Spanish course
  const [basicsUnit, greetingsUnit] = await prisma.$transaction([
    prisma.unit.create({
      data: {
        id: 'unit_es_1',
        title: 'Unit 1: Basics',
        courseId: spanishCourse.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.unit.create({
      data: {
        id: 'unit_es_2',
        title: 'Unit 2: Greetings',
        courseId: spanishCourse.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create lessons for Basics unit
  const [animalsLesson, colorsLesson] = await prisma.$transaction([
    prisma.lesson.create({
      data: {
        id: 'lesson_es_1_1',
        title: 'Animals',
        unitId: basicsUnit.id,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.lesson.create({
      data: {
        id: 'lesson_es_1_2',
        title: 'Colors',
        unitId: basicsUnit.id,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create questions for Animals lesson
  const [dogQuestion, catQuestion] = await prisma.$transaction([
    prisma.question.create({
      data: {
        id: 'question_es_1_1_1',
        question: 'What is "dog" in Spanish?',
        lessonId: animalsLesson.id,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.question.create({
      data: {
        id: 'question_es_1_1_2',
        question: 'What is "cat" in Spanish?',
        lessonId: animalsLesson.id,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create options for questions (using your audio assets)
  await prisma.option.createMany({
    data: [
      // Options for dog question
      {
        id: 'option_es_1_1_1',
        imageSrc: 'logos/dog.svg',
        audioSrc: 'audios/es_boy.mp3',
        questionId: dogQuestion.id,
        order: 1,
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'option_es_1_1_2',
        imageSrc: 'logos/cat.svg',
        audioSrc: 'audios/es_girl.mp3',
        questionId: dogQuestion.id,
        order: 2,
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Options for cat question
      {
        id: 'option_es_1_1_3',
        imageSrc: 'logos/cat.svg',
        audioSrc: 'audios/es_woman.mp3',
        questionId: catQuestion.id,
        order: 1,
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'option_es_1_1_4',
        imageSrc: 'logos/dog.svg',
        audioSrc: 'audios/es_man.mp3',
        questionId: catQuestion.id,
        order: 2,
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  // Create progress records for both users
  await prisma.progress.create({
    data: {
      userId: 'QKYBnczm1Z06nXqdLeVuD9fuoSnCqbIq', // Static user ID
      userName: 'Test User 1',
      userImageSrc: 'logos/boy.svg',
      activeCourseId: spanishCourse.id,
      hearts: 5,
      points: 100,
    },
  });

  // Create lesson progress for the user
  await prisma.lessonProgress.createMany({
    data: [
      {
        userId: 'QKYBnczm1Z06nXqdLeVuD9fuoSnCqbIq', // Static user ID
        lessonId: animalsLesson.id,
        lastQuestionAnswered: 1,
        completed: false,
        updatedAt: new Date(),
      },
      {
        userId: 'QKYBnczm1Z06nXqdLeVuD9fuoSnCqbIq', // Static user ID
        lessonId: colorsLesson.id,
        lastQuestionAnswered: 0,
        completed: false,
        updatedAt: new Date(),
      },
    ],
  });
  console.log('Database seeded successfully with Spanish course!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
