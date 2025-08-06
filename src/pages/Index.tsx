import PosterGenerator from "@/components/PosterGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Deriv Poster Generator</h1>
          <p className="text-xl text-muted-foreground">Create professional Deriv marketing posters</p>
        </div>
        <PosterGenerator />
      </div>
    </div>
  );
};

export default Index;
