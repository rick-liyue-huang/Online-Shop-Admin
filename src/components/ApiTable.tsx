'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Props {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<Props['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantsMap: Record<Props['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export default function ApiTable({
  title,
  description,
  variant = 'public',
}: Props) {
  const handleCopy = (desc: string) => {
    navigator.clipboard.writeText(desc);
    toast({
      title: 'Copied to clipboard',
    });
  };

  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-4">
        {title}
        <Badge variant={variantsMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant={'outline'}
          size="icon"
          onClick={() => handleCopy(description)}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
