'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp, validateField as validateFormField } from '@/lib/schema';
import { AuthInput } from './AuthInput';

interface AuthFormProps {
  isSignUp?: boolean;
  defaultEmail?: string;
}

const HeroBackground = memo(() => (
  <div className="fixed inset-0">
    <div className="absolute inset-0 bg-black md:bg-transparent">
      <Image
        src="/images/hero.jpg"
        alt="Hero background"
        fill
        sizes="100vw"
        className="object-cover opacity-30 md:opacity-10"
        quality={75}
        loading="lazy"
      />
    </div>
  </div>
));

HeroBackground.displayName = 'HeroBackground';

const Logo = memo(() => (
  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
    <Link href="/" className="inline-block">
      <Image
        src="/images/logo.png"
        alt="ElmFlex"
        width={120}
        height={40}
        className="h-auto w-[100px] sm:w-[120px]"
        priority
      />
    </Link>
  </div>
));

Logo.displayName = 'Logo';

export const AuthForm = ({ isSignUp = false, defaultEmail = '' }: AuthFormProps) => {
  const router = useRouter();

  // Type for form data
  interface FormData {
    name: string;
    email: string;
    password: string;
  }

  // Type for form errors
  interface FormErrors {
    name: string;
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: defaultEmail,
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update form data
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [field]: '' }));
    // Only validate if there's a value
    if (value.trim()) {
      const error = validateFormField(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate all fields
      const newErrors = {
        name: isSignUp ? validateFormField('name', formData.name) : '',
        email: validateFormField('email', formData.email),
        password: validateFormField('password', formData.password)
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some(error => error !== '')) {
        setIsLoading(false);
        return;
      }

      // Attempt authentication
      const result = isSignUp 
        ? await signUp(formData.email, formData.password, formData.name)
        : await signIn(formData.email, formData.password);

      if (!result.success) {
        if (result.error === 'Email not found') {
          setErrors(prev => ({ ...prev, email: 'Email not found' }));
        } else if (result.error === 'Incorrect password') {
          setErrors(prev => ({ ...prev, password: 'Incorrect password' }));
        } else if (result.error === 'Email already exists') {
          setErrors(prev => ({ ...prev, email: 'Email already exists. Please sign in instead.' }));
        }
        return;
      }

      // Clear any existing errors on success
      setErrors({ name: '', email: '', password: '' });
      setSuccess('Success! Redirecting...');
      router.push('/home');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, isSignUp, router]);

  return (
    <main className="relative min-h-screen bg-black">
      <HeroBackground />
      <Logo />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-0 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-black/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl border-2 border-gray-800">
          <div className="text-center">
            <h1 className="mt-6 text-3xl font-bold text-white">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <Link href="/sign-in" className="text-white hover:underline">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  New to ElmFlex?{' '}
                  <Link href="/sign-up" className="text-white hover:underline">
                    Create an account
                  </Link>
                </>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {isSignUp && (
              <AuthInput
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e)}
                error={errors.name}
                isLoading={isLoading}
                isSignUp={isSignUp}
              />
            )}

            <AuthInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e)}
              error={errors.email}
              isLoading={isLoading}
              isSignUp={isSignUp}
            />

            <AuthInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e)}
              error={errors.password}
              isLoading={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 border border-transparent rounded-lg
                text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>{isSignUp ? 'Create account' : 'Sign in'}</span>
              )}
            </button>

            {success && (
              <div className="mt-3 text-sm text-green-500 text-center animate-fade-in-up">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default memo(AuthForm);
