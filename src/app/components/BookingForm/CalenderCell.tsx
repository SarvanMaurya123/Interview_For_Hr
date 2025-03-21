import { useRef } from 'react';
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria';
import { CalendarState } from 'react-stately';
import { CalendarDate, getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { cn } from '@/lib/utils';

export function CalendarCell({
    state,
    date,
    currentMonth,
    isDateUnavailable,
}: {
    state: CalendarState;
    date: CalendarDate;
    currentMonth: CalendarDate;
    isDateUnavailable?: boolean;
}) {
    const ref = useRef(null);
    const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell({ date }, state, ref);
    const { focusProps, isFocusVisible } = useFocusRing();

    const isDateToday = isToday(date, getLocalTimeZone());
    const isOutsideMonth = !isSameMonth(currentMonth, date);
    const isFinalDisabled = isDisabled || isDateUnavailable;

    return (
        <td {...cellProps} className={cn('py-1 px-1 relative', isFocusVisible && 'z-10')}>
            <div
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                hidden={isOutsideMonth}
                className="size-10 sm:size-14 outline-none group rounded-md"
            >
                <div
                    className={cn(
                        'size-full rounded-sm flex items-center justify-center text-sm font-semibold cursor-pointer transition',
                        isFinalDisabled && 'text-gray-400 cursor-not-allowed',
                        isSelected ? 'bg-pink-600 text-white' : 'hover:bg-pink-600/20',
                        isDateToday && 'bg-pink-500 text-white', // ✅ Highlight today
                        isFocusVisible && 'ring-2 ring-pink-500'
                    )}
                >
                    {formattedDate}
                    {isDateToday && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 mr-5 rounded-full size-2" />
                    )}
                </div>
            </div>
        </td>
    );
}
