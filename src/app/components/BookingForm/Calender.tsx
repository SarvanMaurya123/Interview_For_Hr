'use client'
import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import { CalendarPropsBase, DateValue } from '@react-types/calendar';
import { CalenderHeader } from './CalanderHeader';
import { CalendarGrid } from './CalendarGrid';


export function Calendars(props: CalendarPropsBase & { isDateUnavailable?: (data: DateValue) => boolean }) {
    const { locale } = useLocale()
    let state = useCalendarState({
        ...props,
        visibleDuration: { months: 1 },
        locale,
        createCalendar
    });
    let {
        calendarProps,
        prevButtonProps,
        nextButtonProps,
        title
    } = useCalendar(props, state);

    return (<>
        <div {...calendarProps} className="inline-block">
            <CalenderHeader
                state={state}
                calendarProps={calendarProps}
                prevButtonProps={prevButtonProps}
                nextButtonProps={nextButtonProps}
            />
            <div className='flex gap-8'>
                <CalendarGrid
                    state={state}
                    isDateUnavailable={props.isDateUnavailable}
                />
            </div>
        </div>
    </>)
}