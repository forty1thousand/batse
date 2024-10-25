type QrProps = { src: string, subtle?: boolean }

export function Qr({ src, subtle }: QrProps) {
  return (
    <img
      className={`mix-blend-multiply dark:invert dark:mix-blend-screen ${subtle && "opacity-70 duration-300 hover:opacity-100"}`}
      src={src}
      alt={src}
    />
  );
}
