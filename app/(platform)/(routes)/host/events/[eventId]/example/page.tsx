"use client";

import * as React from "react"
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eye, LayoutDashboard, MoveLeft } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import HostExamplePage01 from "./_components/host-ex-01";
import HostExamplePage02 from "./_components/host-ex-02";
import HostExamplePage03 from "./_components/host-ex-03";
import HostExamplePage04 from "./_components/host-ex-04";
import Fadein from "@/components/fadein";

const frameworks = [
  {
    value: "起業",
    label: "起業",
  },
  {
    value: "インターン",
    label: "インターン",
  },
  {
    value: "就職",
    label: "就職",
  },
  {
    value: "対談",
    label: "対談",
  },
]

const HostExamplePage = ({
  params
}: {
  params: { eventId: string }
}) => {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("起業")
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                記入例
              </h1>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {frameworks.find((framework) => framework.value === value)?.label}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {value === "起業" && (
        <Fadein>
          <HostExamplePage01 />
        </Fadein>
      )}
      {value === "就職" && (
        <Fadein>
          <HostExamplePage02 />
        </Fadein>
      )}
      {value === "インターン" && (
        <Fadein>
          <HostExamplePage03 />
        </Fadein>
      )}
      {value === "対談" && (
        <Fadein>
          <HostExamplePage04 />
        </Fadein>
      )}
    </div>
  );
}

export default HostExamplePage;