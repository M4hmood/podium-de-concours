import ProgressBar from "../ProgressBar";

export default function ProgressBarExample() {
  return (
    <div className="space-y-6 w-full max-w-md">
      <ProgressBar value={92} variant="gold" />
      <ProgressBar value={75} variant="silver" />
      <ProgressBar value={50} variant="bronze" />
      <ProgressBar value={30} />
    </div>
  );
}
