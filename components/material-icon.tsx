type MaterialIconProps = {
  name: string;
  className?: string;
  fill?: boolean;
};

export function MaterialIcon({ name, className = "", fill = false }: MaterialIconProps) {
  return (
    <span className={`material-symbols-outlined${fill ? " fill" : ""} ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}
