'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { BookCopy, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      toast.error('Invalid Phone Number', {
        description: 'Please enter a valid phone number.',
      });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast.success('Code Sent', {
        description: 'A verification code has been sent to your phone.',
      });
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error('Invalid Code', {
        description: 'Please enter the 6-digit verification code.',
      });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On successful verification, redirect to dashboard
      router.push('/manage-students');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-lg font-semibold text-foreground">
        <BookCopy className="h-6 w-6" />
        <span>ClassroomConnect</span>
      </div>
      {step === 1 && (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Please enter your phone to sign in
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSendCode}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Next'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Phone verification</CardTitle>
            <CardDescription className="text-center">
              Please enter your code that send to your phone number
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleVerifyCode}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  placeholder="Enter Your code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Submit'}
              </Button>
              <Button variant="link" className="w-full" onClick={() => setStep(1)}>
                Use a different phone number
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
