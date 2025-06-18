import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LegalDocument {
  title: string;
  content: React.ReactNode;
}

const legalDocuments: Record<string, LegalDocument> = {
  'terms-of-service': {
    title: 'Terms of Service',
    content: (
      <>
        <p className="mb-4"><strong>Last updated: {new Date().toLocaleDateString()}</strong></p>
        <p className="mb-2">Welcome to OurPlatform! These Terms of Service ("Terms") govern your use of OurPlatform and its services. By accessing or using OurPlatform, you agree to be bound by these Terms.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">By creating an account or using OurPlatform, you confirm that you have read, understood, and agree to these Terms. If you do not agree with these Terms, you must not use OurPlatform.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
        <p className="mb-4">You agree not to use OurPlatform for any unlawful purpose or in any way that could harm OurPlatform or its users. Prohibited activities include, but are not limited to, uploading malicious software, spamming, and harassing other users.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
        <p className="mb-4">All content on OurPlatform, including text, graphics, logos, and software, is the property of OurPlatform or its licensors and is protected by copyright and other intellectual property laws.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">OurPlatform is provided "as is" without any warranties. We are not liable for any damages arising from your use of OurPlatform.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Governing Law</h2>
        <p className="mb-4">These Terms are governed by the laws of [Your Jurisdiction], without regard to its conflict of law principles.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on OurPlatform. Your continued use of OurPlatform after such changes constitutes your acceptance of the new Terms.</p>
        
        <p className="mt-6"><em>This is a sample Terms of Service. Please replace with your actual terms.</em></p>
      </>
    ),
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="mb-4"><strong>Last updated: {new Date().toLocaleDateString()}</strong></p>
        <p className="mb-2">Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use OurPlatform.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">We may collect personal information such as your name, email address, and payment information when you register for an account or use our services. We also collect non-personal information, such as browser type and IP address.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">We use your information to provide and improve OurPlatform, process transactions, communicate with you, and comply with legal obligations.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
        <p className="mb-4">We do not sell your personal information. We may share your information with third-party service providers who assist us in operating OurPlatform, or if required by law.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="mb-4">We implement reasonable security measures to protect your information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your information.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Choices</h2>
        <p className="mb-4">You can review and update your account information at any time. You may also opt-out of certain communications.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Children's Privacy</h2>
        <p className="mb-4">OurPlatform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on OurPlatform.</p>

        <p className="mt-6"><em>This is a sample Privacy Policy. Please replace with your actual policy.</em></p>
      </>
    ),
  },
};

const LegalDocumentPage = () => {
  console.log('LegalDocumentPage loaded');
  const { documentType } = useParams<{ documentType: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [documentType]);

  const document = documentType ? legalDocuments[documentType] : null;

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Document Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The legal document you are looking for could not be found.</p>
            <Button asChild className="mt-4">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="outline" asChild className="mb-4">
          <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">{document.title}</h1>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)] md:h-[calc(100vh-250px)] pr-6">
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700">
                {document.content}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalDocumentPage;