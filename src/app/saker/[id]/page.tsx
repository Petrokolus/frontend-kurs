type Props = {
  params: Promise<{ id: string }>;
};

export default async function SakPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Sak #{id}</h1>
      <p className="text-muted-foreground">Detaljer kommer her.</p>
    </div>
  );
}
