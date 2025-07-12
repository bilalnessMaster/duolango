
import { State } from "@/generated/prisma";
import prisma from "@/lib/prism";

// scripts/seed.ts
async function main() {
  // Constants
  const USER_ID = 'EGnlQrGky5vl4GomXnSWHCf2cXysbNb2';
  const AUDIO_PATHS = [
    'es_boy.mp3', 'es_girl.mp3', 'es_man.mp3',
    'es_woman.mp3', 'es_robot.mp3', 'es_zombie.mp3'
  ];

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

  // Create units with simple titles
  const units = await prisma.$transaction([
    prisma.unit.create({
      data: { id: 'unit_1', title: 'Basics', courseId: spanishCourse.id }
    }),
    prisma.unit.create({
      data: { id: 'unit_2', title: 'Everyday', courseId: spanishCourse.id }
    }),
    prisma.unit.create({
      data: { id: 'unit_3', title: 'Food', courseId: spanishCourse.id }
    }),
    prisma.unit.create({
      data: { id: 'unit_4', title: 'Travel', courseId: spanishCourse.id }
    }),
  ]);

  // Create 7 lessons per unit with practical titles
  for (const [unitIndex, unit] of units.entries()) {
    const lessonTitles = [
      'Greetings',
      'Numbers',
      'Colors',
      'Family',
      'Shopping',
      'Directions',
      'Emergency'
    ];

    for (const [index, title] of lessonTitles.entries()) {
      const lesson = await prisma.lesson.create({
        data: {
          id: `unit_${unitIndex + 1}_lesson_${index + 1}`,
          title,
          unitId: unit.id,
          order: index + 1
        }
      });

      // Create 3 questions per lesson
      for (let q = 1; q <= 3; q++) {
        const question = await prisma.question.create({
          data: {
            id: `q_${unitIndex + 1}_${index + 1}_${q}`,
            question: `Sample question ${q} for ${title}`,
            lessonId: lesson.id,
            order: q
          }
        });

        // Create 4 options per question
        await prisma.option.createMany({
          data: [
            {
              id: `opt_${unitIndex + 1}_${index + 1}_${q}_1`,
              imageSrc: `logos/${q % 2 === 0 ? 'boy' : 'girl'}.svg`,
              audioSrc: `audios/${AUDIO_PATHS[(unitIndex + index + q) % AUDIO_PATHS.length]}`,
              questionId: question.id,
              order: 1,
              isCorrect: true
            },
            {
              id: `opt_${unitIndex + 1}_${index + 1}_${q}_2`,
              imageSrc: `logos/${q % 2 === 0 ? 'cat' : 'dog'}.svg`,
              audioSrc: `audios/${AUDIO_PATHS[(unitIndex + index + q + 1) % AUDIO_PATHS.length]}`,
              questionId: question.id,
              order: 2,
              isCorrect: false
            },
            // Add 2 more options...
          ]
        });
      }
    }
  }

  // Create user progress
  await prisma.progress.create({
    data: {
      userId: USER_ID,
      activeCourseId: spanishCourse.id,
      hearts: 5,
      points: 0
    }
  });

  const lessons = await prisma.lesson.findMany({
    select: { id: true, unitId: true, order: true }
  });

  // Create lesson progress for each lesson
  const lessonProgressRecords = lessons.map((lesson, index) => {
    // Progressively mark more lessons as completed
    const isCompleted = index < 5; // First 5 lessons completed
    const lastQuestion = isCompleted ? 3 : 0; // Assuming 3 questions per lesson

    return {
      userId: USER_ID,
      lessonId: lesson.id,
      lastQuestionAnswered: lastQuestion,
      completed: isCompleted,
      state: isCompleted ? State.compeleted : State.not_started,
      updatedAt: new Date()
    };
  });

  await prisma.lessonProgress.createMany({
    data: lessonProgressRecords
  });
  console.log('Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
