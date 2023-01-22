import { Text, View } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-year";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const datesFromStartOfTheYear = generateDatesFromBeginningOfYear()

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
      </View>
    </View>
  )
}