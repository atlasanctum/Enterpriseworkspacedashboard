import { useState } from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Badge } from "./ui/badge";

const countries = [
  { id: "global", name: "Global Overview", beneficiaries: "12.4M", flag: "🌍" },
  { id: "ethiopia", name: "Ethiopia", beneficiaries: "2.1M", flag: "🇪🇹" },
  { id: "bangladesh", name: "Bangladesh", beneficiaries: "1.8M", flag: "🇧🇩" },
  { id: "yemen", name: "Yemen", beneficiaries: "1.5M", flag: "🇾🇪" },
  { id: "south-sudan", name: "South Sudan", beneficiaries: "980K", flag: "🇸🇸" },
  { id: "syria", name: "Syria", beneficiaries: "1.2M", flag: "🇸🇾" },
  { id: "venezuela", name: "Venezuela", beneficiaries: "850K", flag: "🇻🇪" },
  { id: "afghanistan", name: "Afghanistan", beneficiaries: "1.1M", flag: "🇦🇫" },
  { id: "myanmar", name: "Myanmar", beneficiaries: "720K", flag: "🇲🇲" },
  { id: "nigeria", name: "Nigeria", beneficiaries: "640K", flag: "🇳🇬" },
];

export function CountryContextSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span className="truncate">{selectedCountry.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country or program..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup heading="Deployments">
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.name}
                  onSelect={() => {
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={
                      selectedCountry.id === country.id
                        ? "mr-2 size-4 opacity-100"
                        : "mr-2 size-4 opacity-0"
                    }
                  />
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {country.beneficiaries}
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
