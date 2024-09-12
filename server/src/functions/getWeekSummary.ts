import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs';
import { number } from 'zod';

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week')
    .as(db
      .select({
        id: goals.id,
        title: goals.title,
        desireWeeklyFrequency: goals.desireWeeklyFrequency,
        createdAt: goals.createdAt
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
    )

  const goalsCompletedInWeek = db.$with('goal_completed_in_week')
    .as(
      db.select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql/*sql*/`
          DATE(${goalCompletions.createdAt})
        `.as('completedAtDate'),
      })
        .from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek))
        )
        .orderBy(desc(goalCompletions.createdAt))
    )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql /*sql*/`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )
        `.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  )

  const result = await db
  .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
  .select({
    completed: sql /*sql*/ `(SELECT COUNT(*) from ${goalsCompletedInWeek})`.mapWith(Number),
    total: sql /*sql*/ `(SELECT SUM(${goalsCreatedUpToWeek.desireWeeklyFrequency}) from ${goalsCreatedUpToWeek})`.mapWith(Number),
    goalsPerDay: sql /*sql*/`
      JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )`
  })
  .from(goalsCompletedByWeekDay)
  
  return {
    summary: result
  }
}