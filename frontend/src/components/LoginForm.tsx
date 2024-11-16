import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { useAuth } from "@/context/authContext";

const formSchema: z.ZodSchema = z.object({
  email: z.string().email({
    message: "Adres email nie jest poprawny.",
  }),
  password: z
    .string({ required_error: "Hasło jest wymagane." })
    .min(8, {
      message: "Hasło musi mieć minimum 8 znaków.",
    })
    .max(64, {
      message: "Hasło musi mieć maksimum 64 znaków.",
    }),
});

function LoginForm() {
  const { setUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.errorMessage);
      }
      setUser(data.data);
      toast({
        title: "Pomyślnie zalogowano",
      });
    } catch (err) {
      toast({
        title: "Błąd",
        description: "Błędne dane logowania",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Pełny adres email." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Hasło." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Zaloguj się</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
