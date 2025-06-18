import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator'; // Custom component
import { AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  console.log('SignupPage loaded');
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const passwordValue = form.watch('password');

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup form submitted:', data);
    // Simulate API call
    setFormError(null);
    // Example: Simulate email already exists
    if (data.email === "taken@example.com") {
      setFormError("This email address is already registered. Would you like to log in?");
      form.setError("email", { type: "server", message: "This email address is already registered." });
      return;
    }
    // On successful "server" validation
    navigate('/signup-success');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create your Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {formError.includes("log in") ? (
                    <>
                      This email address is already registered. Would you like to <Link to="/login" className="font-medium text-primary hover:underline">log in</Link>?
                    </>
                  ) : formError}
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...form.register("fullName")} placeholder="John Doe" />
              {form.formState.errors.fullName && <p className="text-xs text-red-500 mt-1">{form.formState.errors.fullName.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} placeholder="you@example.com" />
              {form.formState.errors.email && <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)} className="text-xs">
                        {showPassword ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle password visibility</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="password" type={showPassword ? "text" : "password"} {...form.register("password")} placeholder="••••••••" />
              <PasswordStrengthIndicator password={passwordValue} />
              {form.formState.errors.password && <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                 <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-xs">
                        {showConfirmPassword ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle confirm password visibility</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...form.register("confirmPassword")} placeholder="••••••••" />
              {form.formState.errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{form.formState.errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" {...form.register("terms")} 
                className={form.formState.errors.terms ? "border-red-500" : ""}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{' '}
                  <Link to="/legal/terms-of-service" target="_blank" className="font-medium text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/legal/privacy-policy" target="_blank" className="font-medium text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </Label>
                {form.formState.errors.terms && <p className="text-xs text-red-500">{form.formState.errors.terms.message}</p>}
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;