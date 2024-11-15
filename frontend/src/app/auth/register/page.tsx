"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { useAuth } from "@/context/authContext";

const formSchema: z.ZodSchema = z
  .object({
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
    passwordConfirmation: z.string({
      required_error: "Potwierdzenie hasła jest wymagane.",
    }),
    birthDate: z.string({
      required_error: "Data urodzenia jest wymagana.",
    }),
    sex: z.enum(["M", "F", "O"], {
      invalid_type_error: "Nieprawidłowa opcja.",
    }),
    region: z.enum(
      [
        "AM_NORTH",
        "AM_SOUTH",
        "AUS",
        "EU_WEST",
        "EU_EAST",
        "EU_SOUTH",
        "ASI_EAST",
        "ASI_MID",
        "ASI_WEST",
        "AFR",
      ],
      {
        invalid_type_error: "Nieprawidłowa opcja.",
      }
    ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Hasła są różne",
    path: ["passwordConfirmation"],
  });

function Register() {
  const router = useRouter();

  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      birthDate: "",
      sex: "O",
      region: "EU_WEST",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.errorMessage);
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  if (user !== null && user !== "loading") {
    router.push("/");
    return null;
  }

  return (
    <div className="w-full grow flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-96 flex flex-col"
        >
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
                  <Input
                    type="password"
                    placeholder="Hasło musi zawierać 8-64 dowolne znaki."
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwierdź hasło</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data urodzenia</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        type="text"
                        placeholder="Wybierz datę"
                        readOnly
                        value={field.value}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString().split("T")[0]);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Płeć</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"F"}>Kobieta</SelectItem>
                    <SelectItem value={"M"}>Mężczyzna</SelectItem>
                    <SelectItem value={"O"}>Inna</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Zarejestruj się</Button>
        </form>
      </Form>
    </div>
  );
}

export default Register;
