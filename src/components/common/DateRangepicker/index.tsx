// components/DateRangePicker.tsx
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format, isBefore, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  className?: string;
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  value,
  onChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePicker, setActivePicker] = useState<"from" | "to">("from");

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (activePicker === "from") {
      onChange({ from: date, to: undefined });
      setActivePicker("to");
    } else {
      onChange({ from: value?.from, to: date });
      setIsOpen(false);
      setActivePicker("from");
    }
  };

  const getDisabledDays = (date: Date) => {
    if (activePicker === "to") {
      return isBefore(date, value?.from || new Date()) || 
             isSameDay(date, value?.from || new Date());
    }
    // For 'from' picker, disable past dates
    return isBefore(date, new Date());
  };



  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value?.to ? (
                <>
                  {format(value.from, "MMM d, yyyy")} — {format(value.to, "MMM d, yyyy")}
                </>
              ) : (
                `${format(value.from, "MMM d, yyyy")} — Check-out`
              )
            ) : (
              "Check-in — Check-out"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white"  align="start">
          <Calendar
            mode="single"
            selected={activePicker === "from" ? value?.from : value?.to}
            onSelect={handleSelect}
            disabled={getDisabledDays}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}