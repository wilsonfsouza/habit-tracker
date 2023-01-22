import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-year";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const datesFromStartOfTheYear = generateDatesFromBeginningOfYear()

const MIN_WEEKS = 18
const DAYS_IN_A_WEEK = 7

const minimumSummaryDateSize = MIN_WEEKS * DAYS_IN_A_WEEK
const amountOfDaysToFill = minimumSummaryDateSize - datesFromStartOfTheYear.length

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View
        className="flex-row mt-6 mb-2"
      >
        {WEEK_DAYS.map((weekDay, index) => (
          <Text 
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{width: DAY_SIZE}}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View
          className="flex-row flex-wrap"
        >
        {
          datesFromStartOfTheYear.map(date => (
            <HabitDay
              key={date.toString()}
            />
          ))
        }

        {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, index) => (
          <View 
            className="bg-zinc-900 rounded-lg border-2 m-1 boder-zinc-800 opacity-40"   
            style={{width: DAY_SIZE, height: DAY_SIZE}} 
          />
        ))}
        </View>
      </ScrollView>
    </View>
  )
}