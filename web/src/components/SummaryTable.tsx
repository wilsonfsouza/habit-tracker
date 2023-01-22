import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-year"
import { HabitDay } from "./HabitDay"

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const summaryDates = generateDatesFromBeginningOfYear()

const MIN_WEEKS = 18
const DAYS_IN_A_WEEK = 7

const minimumSummaryDateSize = MIN_WEEKS * DAYS_IN_A_WEEK
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length

export function SummaryTable() {
  return (
    <div className="w-full flex gap-3">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {WEEK_DAYS.map(weekDay => (
          <div
            key={weekDay}
            className="text-zinc-400 text-xl font0-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return <HabitDay key={date.toString()} />
        })}
        {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, index) => {
          return <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
        })}
      </div>
    </div>
  )
}