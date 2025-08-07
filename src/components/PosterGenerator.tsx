import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

const PosterGenerator = () => {
  const { toast } = useToast();
  const posterRef = useRef<HTMLDivElement>(null);

  const [headline, setHeadline] = useState("Top 5 mistakes\nto avoid when trading");
  const [highlightText, setHighlightText] = useState("ETFs with CFDs");
  const [backgroundImage, setBackgroundImage] = useState<string>("/lovable-uploads/f0c38c7e-3fe8-4f33-ac95-9110cd07815a.png");
  const [lowerText, setLowerText] = useState("Your capital is at risk. Not investment advice.");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ff444f");
  const [lowerTextColor, setLowerTextColor] = useState("#666666");
  const [headlineFontSize, setHeadlineFontSize] = useState(36);
  const [highlightFontSize, setHighlightFontSize] = useState(36);
  const [lowerTextFontSize, setLowerTextFontSize] = useState(14);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPoster = async () => {
    if (!posterRef.current) return;

    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = "deriv-poster.png";
      link.href = canvas.toDataURL();
      link.click();

      toast({
        title: "Poster downloaded!",
        description: "Your Deriv poster has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Customize Your Poster</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="headline">Main Headline</Label>
              <Textarea
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter your main headline..."
                className="min-h-[100px] font-inter"
              />
              <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="headlineColor" className="text-sm">Color:</Label>
                <Input
                  id="headlineColor"
                  type="color"
                  value={headlineColor}
                  onChange={(e) => setHeadlineColor(e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Label htmlFor="headlineFontSize" className="text-sm">Size:</Label>
                <Input
                  id="headlineFontSize"
                  type="number"
                  value={headlineFontSize}
                  onChange={(e) => setHeadlineFontSize(Number(e.target.value))}
                  className="w-16 h-8"
                  min="12"
                  max="72"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="highlight">Highlight Text</Label>
              <Input
                id="highlight"
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
                placeholder="Text to highlight"
                className="font-inter"
              />
              <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="highlightColor" className="text-sm">Color:</Label>
                <Input
                  id="highlightColor"
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Label htmlFor="highlightFontSize" className="text-sm">Size:</Label>
                <Input
                  id="highlightFontSize"
                  type="number"
                  value={highlightFontSize}
                  onChange={(e) => setHighlightFontSize(Number(e.target.value))}
                  className="w-16 h-8"
                  min="12"
                  max="72"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lowerText">Lower Text</Label>
              <Input
                id="lowerText"
                value={lowerText}
                onChange={(e) => setLowerText(e.target.value)}
                placeholder="Enter lower text..."
                className="font-inter"
              />
              <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="lowerTextColor" className="text-sm">Color:</Label>
                <Input
                  id="lowerTextColor"
                  type="color"
                  value={lowerTextColor}
                  onChange={(e) => setLowerTextColor(e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Label htmlFor="lowerTextFontSize" className="text-sm">Size:</Label>
                <Input
                  id="lowerTextFontSize"
                  type="number"
                  value={lowerTextFontSize}
                  onChange={(e) => setLowerTextFontSize(Number(e.target.value))}
                  className="w-16 h-8"
                  min="8"
                  max="24"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Background Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <Upload className="w-4 h-4" />
              </div>
            </div>

            <Button onClick={downloadPoster} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Poster
            </Button>
          </div>
        </Card>
      </div>

      {/* Poster Preview */}
      <div className="flex justify-center">
        <div
          ref={posterRef}
          className="relative overflow-hidden shadow-lg font-inter"
          style={{
            width: "400px",
            height: "500px",
            aspectRatio: "4/5"
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* White Background */}
          <div className="absolute inset-0 bg-white z-10" />

          {/* Deriv Logo */}
          <div className="absolute top-6 left-6 z-20">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-inter" style={{ color: "#ff444f" }}>
                deriv
              </span>
              <span className="text-lg font-medium text-gray-700 font-inter">| 25 years</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="absolute top-16 left-6 right-6 z-20">
            <div className="space-y-1">
              {/* Headline and Highlight on same line */}
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-bold font-inter whitespace-pre-line" style={{ color: highlightColor, fontSize: `${highlightFontSize}px` }}>
                  {highlightText}
                </span>
                <span className="font-bold font-inter whitespace-pre-line" style={{ color: headlineColor, fontSize: `${headlineFontSize}px` }}>
                  {headline}
                </span>
              </div>
            </div>
          </div>

          {/* Background Image - positioned in middle/bottom area */}
          <div className="absolute bottom-20 left-6 right-6 z-15">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-64 object-contain"
            />
          </div>

          {/* Lower Text */}
          <div className="absolute bottom-4 left-6 right-6 z-20">
            <p
              className="font-inter"
              style={{ color: lowerTextColor, fontSize: `${lowerTextFontSize}px` }}
            >
              {lowerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;
