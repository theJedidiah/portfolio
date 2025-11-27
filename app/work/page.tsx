import { WorkSection } from "@/components/work-section";

export const metadata = {
  title: "Work | Portfolio",
  description: "A collection of projects spanning product management and engineering.",
};

export default function WorkPage() {
  return (
    <div className="pt-24">
      <WorkSection showAll />
    </div>
  );
}

