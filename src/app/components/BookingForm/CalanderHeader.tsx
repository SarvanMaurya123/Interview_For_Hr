
import { type CalendarState } from 'react-stately';
import { FocusableElement, DOMAttributes } from "@react-types/shared";
import { type AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { CalenderButton } from './CalenderButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function CalenderHeader({ state, calendarProps, prevButtonProps, nextButtonProps }: {
    state: CalendarState,
    calendarProps: DOMAttributes<FocusableElement>,
    prevButtonProps: AriaButtonProps<"button">,
    nextButtonProps: AriaButtonProps<"button">
}) {
    const montDataFormatter = useDateFormatter({
        month: "short",
        year: "numeric",
        timeZone: state.timeZone,
    })

    const [monthsName, _, year] = montDataFormatter.formatToParts(state.visibleRange.start.toDate(state.timeZone)).map((part) => part.value)

    return (<>
        <div className='flex items-center pb-5'>
            <VisuallyHidden>
                <h2>{calendarProps["aria-label"]}</h2>
            </VisuallyHidden>
            <h2 className='font-semibold flex-1'>{monthsName}  <span>{year}</span></h2>

            <div className='flex items-center gap-3'>
                <CalenderButton {...prevButtonProps}>
                    <ChevronLeft className='size-4' />
                </CalenderButton>
                <CalenderButton {...nextButtonProps}>
                    <ChevronRight className='size-4' />
                </CalenderButton>
            </div>
        </div>

    </>)
}