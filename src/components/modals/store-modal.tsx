'use client';

import { useStoreModal } from '@/hooks/use-store.modal';
import { Modal } from '@/components/Modal';
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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { SignOutButton } from '@clerk/nextjs';

const formSchema = z.object({
  name: z.string().min(3).max(255),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data));

    try {
      setLoading(true);
      const response = await axios.post('/api/stores', data);
      // toast({
      //   title: 'Create Store Successfully',
      // });

      // to completely refresh the whole page, and then load the database data
      window.location.assign(`/${response.data.id}`);
      console.log(response.data);
      // storeModal.onClose();
    } catch (err) {
      toast({
        title: 'Create Store Failed',
        variant: 'destructive',
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="create the new store to manage the products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name: </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Online Shop"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant={'destructive'}
                onClick={storeModal.onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={loading} variant={'outline'} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
