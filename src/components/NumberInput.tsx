"use client";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function NumberInput({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  max,
}: Props) {
  function handleChange(raw: string) {
    const cleaned = raw.replace(/[^0-9.]/g, "");
    if (max !== undefined && parseFloat(cleaned) > max) return;
    onChange(cleaned);
  }

  return (
    <div>
      <label className="block text-[13px] text-muted-foreground mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base font-medium num placeholder:text-muted-foreground/40 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
