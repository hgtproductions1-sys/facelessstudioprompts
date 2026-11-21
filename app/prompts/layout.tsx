import PromptVariablesProvider from '@/components/PromptVariablesProvider';

export default function PromptLayout({ children }: { children: React.ReactNode }) {
  return <PromptVariablesProvider>{children}</PromptVariablesProvider>;
}
