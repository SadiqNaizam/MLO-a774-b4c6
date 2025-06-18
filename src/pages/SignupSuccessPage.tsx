import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const SignupSuccessPage = () => {
  console.log('SignupSuccessPage loaded');
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Account Created!</CardTitle>
          <CardDescription>
            Your registration was successful.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="default" className="bg-green-50 border-green-200 text-green-700">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            <AlertTitle className="font-semibold">Success</AlertTitle>
            <AlertDescription>
              Your account has been created successfully. Please check your email to verify your account.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-gray-600">
            You can now proceed to log in with your new credentials.
          </p>
          <Button asChild className="w-full">
            <Link to="/login">Proceed to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupSuccessPage;