'use client';

import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import React from 'react';
import ApiTable from '@/components/ApiTable';

interface Props {
  entityName: string;
  entityIdName: string;
}

export default function ApiList({ entityIdName, entityName }: Props) {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <div>
      <ApiTable
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiTable
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiTable
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiTable
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiTable
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
}
