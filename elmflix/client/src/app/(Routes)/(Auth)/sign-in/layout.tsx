import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - ElmFlex',
  description: 'Sign in to your ElmFlex account',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
