interface WordmarkProps {
  label?: string;
}
export default function Wordmark({ label }: WordmarkProps) {
  return (
    <a className="wordmark" href="#home" aria-label={label}>
      quiique<span aria-hidden="true">✳</span>
      <i />
    </a>
  );
}
