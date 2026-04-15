import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
{/* Questions CTA */ }

export default function ContactRecruit() {
  return (
<section className="py-16 bg-section-light">
    <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-xl mx-auto bg-primary border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-2">Have Questions?</h3>
            <p className="text-muted-foreground text-white mb-6">
                If you have any questions about this position or the application process,
                feel free to reach out to our recruitment team.
            </p>
            <Button variant="heroOutline">
                Contact Recruitment Team <ArrowRight className="w-4 h-4 ml-1 border-white" />
            </Button>
        </div>
    </div>
</section>
    );
}