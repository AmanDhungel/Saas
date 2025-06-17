import { getCompanionById } from "@/lib/actions/companion.actions";

const CompanionSession = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const companions = await getCompanionById(id!);

  return <div>CompanionSession</div>;
};

export default CompanionSession;
