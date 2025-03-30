// components/GuestSelector.tsx
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface GuestSelectorProps {
  adults: number;
  children: number;
  pets: boolean;
  onChange: (guests: { adults: number; children: number; pets: boolean }) => void;
}

export function GuestSelector({ adults, children, pets, onChange }: GuestSelectorProps) {
  const updateCount = (type: "adults" | "children", value: number) => {
    const newCount = type === "adults" 
      ? Math.max(1, adults + value) 
      : Math.max(0, children + value);
    
    onChange({
      adults: type === "adults" ? newCount : adults,
      children: type === "children" ? newCount : children,
      pets
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {adults + children} travelers
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-3 bg-white">
        <div className="flex justify-between items-center">
          <span>Adults</span>
          <div className="flex items-center space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => updateCount("adults", -1)}
              disabled={adults <= 1}
            className="hover:bg-primary"
            >
              <Minus size={16} />
            </Button>
            <span className="w-6 text-center">{adults}</span>
            <Button size="icon" variant="outline" onClick={() => updateCount("adults", 1)} className="hover:bg-primary">
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span>Children</span>
          <div className="flex items-center space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => updateCount("children", -1)}
              disabled={children <= 0}
              className="hover:bg-primary"
            >
              <Minus size={16} />
            </Button>
            <span className="w-6 text-center">{children}</span>
            <Button size="icon" variant="outline" onClick={() => updateCount("children", 1)} className="hover:bg-primary">
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="pets"
            checked={pets}
            onCheckedChange={(checked) => onChange({ adults, children, pets: !!checked })}
            className="border-black"
          />
          <label htmlFor="pets" className="text-sm">
            I am traveling with pets
            <br />
            <span className="text-xs text-muted-foreground">
              If checked, only pet-friendly properties will be shown.
            </span>
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
}