"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { commandConfig } from "@/lib/command-config"
import { CommandItems } from "@/types/command-items"

export default function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleItemSelect = (item: CommandItems) => {
    setOpen(false)

    if (item.onClick) {
      item.onClick()
    } else if (item.url) {
      router.push(item.url)
    }
  }

  return (
      <>
        <button
            className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-fit rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
            onClick={() => setOpen(true)}
        >
        <span className="flex grow items-center">
          <SearchIcon
              className="text-muted-foreground/80 -ms-1 me-3"
              size={16}
              aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
          <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            ⌘K
          </kbd>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {commandConfig.map((group, groupIndex) => (
                <React.Fragment key={group.title}>
                  <CommandGroup heading={group.title}>
                    {group.items.map((item, itemIndex) => {
                      const IconComponent = item.icon
                      return (
                          <CommandItem
                              key={`${group.title}-${item.title}-${itemIndex}`}
                              onSelect={() => handleItemSelect(item)}
                              className="cursor-pointer"
                          >
                            <IconComponent
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>{item.title}</span>
                          </CommandItem>
                      )
                    })}
                  </CommandGroup>
                  {/* Add separator between groups, but not after the last group */}
                  {groupIndex < commandConfig.length - 1 && <CommandSeparator />}
                </React.Fragment>
            ))}
          </CommandList>
        </CommandDialog>
      </>
  )
}