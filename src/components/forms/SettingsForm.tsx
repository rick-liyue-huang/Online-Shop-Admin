'use client';

import { Store } from '@prisma/client';
import React, { useState } from 'react';
import SettingFormHeading from '@/components/forms/SettingFormHeading';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alert-modal';
import ApiTable from '@/components/ApiTable';
import { useOrigin } from '@/hooks/use-origin';

interface Props {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);

    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh(); // server component to refresh
      toast({
        title: 'Update Store Successfully',
      });
    } catch (err) {
      toast({
        title: 'Update Store Failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStoreDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast({
        title: 'Delete Store Successfully',
      });
    } catch (err) {
      toast({
        title:
          'Make sure you will delete all the products and categories first',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleStoreDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <SettingFormHeading
          title={'Setting'}
          description="Manage Store preferences"
        />
        <Button
          disabled={loading}
          variant={'destructive'}
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant={'outline'}
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </Form>

      <Separator />
      <ApiTable
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
