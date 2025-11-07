import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FileDown, Plus, ClipboardList } from "lucide-react";
import { jsPDF } from "jspdf";

const mockRecords = [
  {
    id: "1",
    clientName: "John Anderson",
    problem: "Experiencing persistent anxiety and difficulty sleeping",
    diagnosis: "Generalized Anxiety Disorder (GAD)",
    recommendation:
      "Cognitive Behavioral Therapy (CBT) sessions twice weekly, relaxation techniques, sleep hygiene improvement",
    date: "2025-01-15",
  },
  {
    id: "2",
    clientName: "Sarah Mitchell",
    problem: "Low mood, loss of interest in activities, social withdrawal",
    diagnosis: "Major Depressive Disorder (MDD) - Moderate",
    recommendation:
      "Individual therapy sessions, consider medication consultation with psychiatrist, encourage social engagement activities",
    date: "2025-01-20",
  },
  {
    id: "3",
    clientName: "Michael Chen",
    problem: "Workplace stress, burnout symptoms, difficulty concentrating",
    diagnosis: "Adjustment Disorder with Mixed Anxiety and Depressed Mood",
    recommendation:
      "Stress management techniques, work-life balance counseling, mindfulness practices, follow-up in 2 weeks",
    date: "2025-02-01",
  },
];

const MedicalRecord = () => {
  const [records, setRecords] = useState(mockRecords);
  const [formData, setFormData] = useState({
    clientName: "",
    problem: "",
    diagnosis: "",
    recommendation: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new record
  const handleSaveRecord = () => {
    // Validation
    if (
      !formData.clientName ||
      !formData.problem ||
      !formData.diagnosis ||
      !formData.recommendation
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };

    setRecords((prev) => [newRecord, ...prev]);

    // Reset form
    setFormData({
      clientName: "",
      problem: "",
      diagnosis: "",
      recommendation: "",
    });

    toast({
      title: "Record Saved",
      description: "Medical record has been successfully saved.",
      className: "bg-accent text-accent-foreground",
    });

    /* 
    // API Integration Example - POST new record
    try {
      const response = await fetch('https://your-api.com/api/medical-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAuthToken}` // Add your auth token
        },
        body: JSON.stringify(newRecord)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save record');
      }
      
      const savedRecord = await response.json();
      setRecords(prev => [savedRecord, ...prev]);
      
      toast({
        title: "Record Saved",
        description: "Medical record has been successfully saved to the database.",
        className: "bg-accent text-accent-foreground"
      });
    } catch (error) {
      console.error('Error saving record:', error);
      toast({
        title: "Error",
        description: "Failed to save the record. Please try again.",
        variant: "destructive"
      });
    }
    */
  };

  // Generate and download PDF
  const handleDownloadPDF = (record) => {
    const doc = new jsPDF();

    // Set up document styling
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // Header - Medical Record Title
    doc.setFillColor(33, 150, 243); // Medical blue
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("MEDICAL RECORD", pageWidth / 2, 22, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Record ID and Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Record ID: ${record.id}`, margin, 50);
    doc.text(`Date: ${record.date}`, pageWidth - margin, 50, {
      align: "right",
    });

    // Client Name Section
    let yPosition = 65;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT NAME", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(record.clientName, margin, yPosition);

    // Divider line
    yPosition += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Problem Section
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PRESENTING PROBLEM", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const problemLines = doc.splitTextToSize(record.problem, contentWidth);
    doc.text(problemLines, margin, yPosition);
    yPosition += problemLines.length * 6;

    // Divider line
    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Diagnosis Section
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DIAGNOSIS", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const diagnosisLines = doc.splitTextToSize(record.diagnosis, contentWidth);
    doc.text(diagnosisLines, margin, yPosition);
    yPosition += diagnosisLines.length * 6;

    // Divider line
    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Recommendation Section
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("RECOMMENDATIONS", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const recommendationLines = doc.splitTextToSize(
      record.recommendation,
      contentWidth
    );
    doc.text(recommendationLines, margin, yPosition);

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("CONFIDENTIAL MEDICAL RECORD", pageWidth / 2, footerY, {
      align: "center",
    });
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      footerY + 5,
      { align: "center" }
    );

    // Save the PDF
    doc.save(
      `medical-record-${record.clientName.replace(/\s+/g, "-")}-${
        record.id
      }.pdf`
    );

    toast({
      title: "PDF Downloaded",
      description: `Medical record for ${record.clientName} has been downloaded.`,
      className: "bg-accent text-accent-foreground",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Medical Record System
          </h1>
          <p className="text-muted-foreground">
            Professional counseling record management
          </p>
        </div>

        {/* New Record Form */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              <CardTitle>New Client Record</CardTitle>
            </div>
            <CardDescription>
              Enter client information and counseling details
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client's full name"
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem">Presenting Problem</Label>
              <Textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                placeholder="Describe the client's presenting problem or chief complaint"
                rows={4}
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                placeholder="Enter clinical diagnosis or assessment"
                rows={3}
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendation">Recommendations</Label>
              <Textarea
                id="recommendation"
                name="recommendation"
                value={formData.recommendation}
                onChange={handleInputChange}
                placeholder="Enter treatment recommendations and follow-up plan"
                rows={4}
                className="focus-visible:ring-primary"
              />
            </div>

            <Button
              onClick={handleSaveRecord}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Record
            </Button>
          </CardContent>
        </Card>

        {/* Saved Records List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Saved Records</h2>
            <span className="text-sm text-muted-foreground">
              ({records.length} total)
            </span>
          </div>

          {/* 
          // API Integration Example - Fetch records on component mount
          useEffect(() => {
            const fetchRecords = async () => {
              try {
                const response = await fetch('https://your-api.com/api/medical-records', {
                  headers: {
                    'Authorization': `Bearer ${yourAuthToken}`
                  }
                });
                
                if (!response.ok) {
                  throw new Error('Failed to fetch records');
                }
                
                const data = await response.json();
                setRecords(data);
              } catch (error) {
                console.error('Error fetching records:', error);
                toast({
                  title: "Error",
                  description: "Failed to load records from the server.",
                  variant: "destructive"
                });
              }
            };
            
            fetchRecords();
          }, []);
          */}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => (
              <Card
                key={record.id}
                className="shadow-md hover:shadow-lg transition-shadow border-primary/10"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{record.clientName}</CardTitle>
                  <CardDescription className="text-xs">
                    {record.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Problem:
                    </p>
                    <p className="text-sm line-clamp-2">{record.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Diagnosis:
                    </p>
                    <p className="text-sm line-clamp-2">{record.diagnosis}</p>
                  </div>
                  <Button
                    onClick={() => handleDownloadPDF(record)}
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    size="sm"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {records.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <ClipboardList className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No records yet. Add your first client record above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
