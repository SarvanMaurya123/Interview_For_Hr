import { useCalendarGrid, useLocale } from 'react-aria';
import { DateDuration, DateValue, endOfMonth, getWeeksInMonth } from '@internationalized/date';
import { CalendarState } from 'react-stately';
import { CalendarCell } from './CalenderCell';

export function CalendarGrid({
    state,
    isDateUnavailable,
}: {
    state: CalendarState;
    isDateUnavailable?: (data: DateValue) => boolean;
}) {
    const startDate = state.visibleRange.start;
    const endDate = endOfMonth(startDate);
    const { locale } = useLocale();

    const { gridProps, headerProps, weekDays } = useCalendarGrid(
        { startDate, endDate, weekdayStyle: 'short' },
        state
    );

    const weeksInMonth = getWeeksInMonth(startDate, locale);

    return (
        <table {...gridProps} className="w-full text-center border-collapse">
            <thead {...headerProps} className="text-gray-700 font-semibold ">
                <tr>
                    {weekDays.map((day, index) => (
                        <th key={index} className="py-2">{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(weeksInMonth)].map((_, weekIndex) => (
                    <tr key={weekIndex} className="border-b">
                        {state.getDatesInWeek(weekIndex).map((date, i) =>
                            date ? (
                                <CalendarCell
                                    key={i}
                                    currentMonth={startDate}
                                    state={state}
                                    date={date}
                                    isDateUnavailable={isDateUnavailable?.(date)}
                                />
                            ) : (
                                <td key={i} className="h-10" />
                            )
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
