import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert Spanish courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Spanish", imageSrc: "/es.svg" },
        { title: "Italian", imageSrc: "/it.svg" },  // New course for Italian
        { title: "Croatian", imageSrc: "/hr.svg" },
        { title: "French", imageSrc: "/fr.svg" },
        { title: "Japanese", imageSrc: "/jp.svg" },
      ])
      .returning();

    // For each course, insert units and lessons
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

            for (const challenge of challenges) {
              if (course.title === "Spanish") {
                // Spanish challenge options
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
                  ]);
                }
            
                // Other challenge orders (4-8) for Spanish will follow a similar pattern
              }
            
              if (course.title === "Italian") {
                // Italian challenge options
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "l'uomo", imageSrc: "/man.svg", audioSrc: "/it_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la donna", imageSrc: "/woman.svg", audioSrc: "/it_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "il ragazzo", imageSrc: "/boy.svg", audioSrc: "/it_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "la donna", imageSrc: "/woman.svg", audioSrc: "/it_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "il ragazzo", imageSrc: "/boy.svg", audioSrc: "/it_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "l'uomo", imageSrc: "/man.svg", audioSrc: "/it_man.mp3" },
                  ]);
                }
            
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "il ragazzo", imageSrc: "/boy.svg", audioSrc: "/it_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "l'uomo", imageSrc: "/man.svg", audioSrc: "/it_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la donna", imageSrc: "/woman.svg", audioSrc: "/it_woman.mp3" },
                  ]);
                }
            
                // Other challenge orders (4-8) for Italian will follow a similar pattern
              }
            
              if (course.title === "Croatian") {
                // Croatian challenge options
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "muškarac", imageSrc: "/man.svg", audioSrc: "/hr_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "žena", imageSrc: "/woman.svg", audioSrc: "/hr_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "dječak", imageSrc: "/boy.svg", audioSrc: "/hr_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "žena", imageSrc: "/woman.svg", audioSrc: "/hr_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "muškarac", imageSrc: "/man.svg", audioSrc: "/hr_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "dječak", imageSrc: "/boy.svg", audioSrc: "/hr_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "dječak", imageSrc: "/boy.svg", audioSrc: "/hr_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "muškarac", imageSrc: "/man.svg", audioSrc: "/hr_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "žena", imageSrc: "/woman.svg", audioSrc: "/hr_woman.mp3" },
                  ]);
                }
            
                // Other challenge orders (4-8) for Croatian will follow a similar pattern
              }
            
              if (course.title === "French") {
                // French challenge options
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "l'homme", imageSrc: "/man.svg", audioSrc: "/fr_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la femme", imageSrc: "/woman.svg", audioSrc: "/fr_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "le garçon", imageSrc: "/boy.svg", audioSrc: "/fr_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "la femme", imageSrc: "/woman.svg", audioSrc: "/fr_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "le garçon", imageSrc: "/boy.svg", audioSrc: "/fr_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "l'homme", imageSrc: "/man.svg", audioSrc: "/fr_man.mp3" },
                  ]);
                }
            
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "le garçon", imageSrc: "/boy.svg", audioSrc: "/fr_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "l'homme", imageSrc: "/man.svg", audioSrc: "/fr_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "la femme", imageSrc: "/woman.svg", audioSrc: "/fr_woman.mp3" },
                  ]);
                }
            
                // Other challenge orders (4-8) for French will follow a similar pattern
              }
            
              if (course.title === "Japanese") {
                // Japanese challenge options
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "男", imageSrc: "/man.svg", audioSrc: "/jp_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "女", imageSrc: "/woman.svg", audioSrc: "/jp_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "少年", imageSrc: "/boy.svg", audioSrc: "/jp_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "女", imageSrc: "/woman.svg", audioSrc: "/jp_woman.mp3" },
                    { challengeId: challenge.id, correct: false, text: "男", imageSrc: "/man.svg", audioSrc: "/jp_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "少年", imageSrc: "/boy.svg", audioSrc: "/jp_boy.mp3" },
                  ]);
                }
            
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    { challengeId: challenge.id, correct: true, text: "少年", imageSrc: "/boy.svg", audioSrc: "/jp_boy.mp3" },
                    { challengeId: challenge.id, correct: false, text: "男", imageSrc: "/man.svg", audioSrc: "/jp_man.mp3" },
                    { challengeId: challenge.id, correct: false, text: "女", imageSrc: "/woman.svg", audioSrc: "/jp_woman.mp3" },
                  ]);
                }
            
                // Other challenge orders (4-8) for Japanese will follow a similar pattern
              }
            }
            
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
