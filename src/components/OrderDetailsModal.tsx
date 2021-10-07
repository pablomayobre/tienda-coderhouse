import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { Link, useNavigate } from "react-router-dom";
import { useSaveOrder } from "../api/useSaveOrder";
import { useCart } from "../providers/CartProvider";

export type Buyer = {
  name: string;
  phone: string;
  email: string;
};

export const OrderDetailsModal = () => {
  const { list, clear } = useCart();
  const submit = useSaveOrder();
  const navigate = useNavigate();

  return (
    <Stack
      padding={8}
      gridGap={3}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth="container.md"
      width="100%"
    >
      <Formik
        initialValues={{ name: "", phone: "", email: "" }}
        onSubmit={(values: Buyer, actions) => {
          console.log(list);
          console.log(values);

          submit(list, values).then((id) => {
            actions.setSubmitting(false);
            clear();
            navigate(`/order/${id}`, { replace: true });
          });
        }}
      >
        {(props) => (
          <Form>
            <Heading textAlign="center">Datos del Comprador</Heading>

            <Stack direction="column" maxWidth="container.md">
              <Field name="name">
                {({ field, form }: FieldProps<string, Buyer>) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="phone">
                {({ field, form }: FieldProps<string, Buyer>) => (
                  <FormControl
                    isInvalid={!!(form.errors.phone && form.touched.phone)}
                  >
                    <FormLabel htmlFor="phone">Número de teléfono</FormLabel>
                    <Input
                      {...field}
                      type="tel"
                      id="phone"
                      placeholder="+00 0000 0000"
                    />
                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }: FieldProps<string, Buyer>) => (
                  <FormControl
                    isInvalid={!!(form.errors.email && form.touched.email)}
                  >
                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="mail@example.com"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <PersistFormikValues name="buyerData" />
            </Stack>
            <Flex gridGap={2} justifyContent="flex-end">
              <Button as={Link} to="/cart">
                Volver al Carrito
              </Button>
              <Button isLoading={props.isSubmitting} type="submit">
                Finalizar Compra
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
