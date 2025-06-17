import CompanionComponent from "@/components/CompanionComponent";
import { getCompanionById } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const CompanionSession = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const companions = await getCompanionById(id!);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companions) redirect("/companions");

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: getSubjectColor(companions.subject) }}
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"></div>
          <Image
            src={`/icons/${companions.subject}.svg`}
            alt="subject"
            width={35}
            height={35}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">{companions.name}</p>
          </div>
          <div className="subject-badge max-sm:hidden">
            {companions.subject}
          </div>
          <p className="text-lg">{companions.topic}</p>
        </div>
        <div className="items-center text-2xl max-md:hidden">
          {companions.duration} minutes
        </div>
      </article>
      <CompanionComponent {...companions} companionId={companions.id} />
    </main>
  );
};

export default CompanionSession;
