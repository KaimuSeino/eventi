"use client"

import * as React from "react"
import { format, addDays } from "date-fns"
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
  value?: DateRange;
  onChange: (value: DateRange) => void;
}

export function DatePickerWithRange({
  value,
  onChange,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (newValue: DateRange | undefined) => {
    if (newValue) {
      onChange(newValue); // Date オブジェクトを渡す
    }
    // setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value && value.from && value.to ? (
            `${format(value.from, "PPP", { locale: ja })} - ${format(value.to, "PPP", { locale: ja })}`
          ) : (
            <span>日付を選択してください</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          mode="range"
          locale={ja}
          selected={value}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
