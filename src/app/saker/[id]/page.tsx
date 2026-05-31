type Props = {
  params: Promise<{ id: string }>;
};

export default async function SakPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sak #{id}</h1>
      <p className="text-muted-foreground">Detaljer kommer her.</p>
    </div>
  );
}
