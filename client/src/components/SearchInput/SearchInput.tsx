import styles from "./SearchInput.module.css";

interface SearchInputProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;

  accentColor?: string;
  accentGlow?: string;
}

export default function SearchInput({ id, value, placeholder, onChange, accentColor, accentGlow }: SearchInputProps) {
  const cssVars = {
    ...(accentColor && { "--search-accent": accentColor }),
    ...(accentGlow && { "--search-accent-glow": accentGlow }),
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper} style={cssVars}>
      <svg className={styles.icon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input id={id} type="text" className={styles.input} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
