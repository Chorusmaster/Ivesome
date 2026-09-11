import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentProps
} from "react";

type PopoverProps = ComponentProps<"div"> & {
  children: ReactNode
}

type PopoverTriggerProps = ComponentProps<"button"> & {
  children: ReactNode
}

type PopoverContentProps = ComponentProps<"div"> & {
  children: ReactNode
}

interface PopoverContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover() {
  const context = useContext(PopoverContext)

  if (!context) {
    throw new Error("Popover components must be used inside <Popover>")
  }

  return context
}

function Popover({ children, className, ...props }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div
        ref={ref}
        data-slot="popover"
        className={"relative " + className}
        {...props}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  const { open, setOpen } = usePopover()
  
  return (
    <button 
      {...props} 
      data-slot="popover-trigger"
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  )
}

function PopoverContent({ children, className, ...props }: PopoverContentProps) {
  const { open } = usePopover()

  if (!open) {
    return null
  }

  return (
    <div
      className={
        "absolute right-0 top-full z-50 mt-2 min-w-32 rounded-card border border-border bg-surface p-2 text-text-primary shadow-modal " +
        (className ?? "")
      }
      {...props}
    >
      {children}
    </div>
  )
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover };