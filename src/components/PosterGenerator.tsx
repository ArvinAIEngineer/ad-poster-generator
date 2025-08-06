import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Upload, Palette } from "lucide-react";
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

          {/* White Fade Overlay */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)"
            }}
          />

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
          <div className="absolute top-20 left-6 right-6 z-20">
            <div className="space-y-2">
              {headline.split('\n').map((line, index) => {
                const words = line.split(' ');
                return (
                  <div key={index} className="text-3xl font-bold leading-tight font-inter">
                    {words.map((word, wordIndex) => {
                      const isHighlight = highlightText && word.toLowerCase().includes(highlightText.toLowerCase());
                      return (
                        <span
                          key={wordIndex}
                          style={{ color: isHighlight ? highlightColor : headlineColor }}
                        >
                          {word}{wordIndex < words.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lower Text */}
          <div className="absolute bottom-4 left-6 right-6 z-20">
            <p 
              className="text-sm font-inter"
              style={{ color: lowerTextColor }}
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