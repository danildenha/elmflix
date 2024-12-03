import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - ElmFlex',
  description: 'Create your ElmFlex account and start streaming',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
