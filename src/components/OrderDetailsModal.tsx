import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { useNavigate } from "react-router-dom";
import { useSaveOrder } from "../api/useSaveOrder";
import { useCart } from "../providers/CartProvider";

export type Buyer = {
  name: string;
  phone: string;
  email: string;
};

const OrderForm = ({ id }: { id: string }) => {
  const { list, clear } = useCart();
  const submit = useSaveOrder();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", phone: "", email: "" }}
      onSubmit={(values: Buyer, actions) => {
        submit(list, values).then((id) => {
          actions.setSubmitting(false);
          clear();
          navigate(`/order/${id}`, { replace: true });
        });
      }}
    >
      {(props) => (
        <Form id={id}>
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
        </Form>
      )}
    </Formik>
  );
};

export const OrderDetailsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="solid" colorScheme="purple" onClick={onOpen}>
        Comprar
      </Button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Datos del Comprador</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <OrderForm id="order-details" />
            </ModalBody>
            <ModalFooter display="flex" gridGap={2} alignItems="flex-end">
              <Button onClick={onClose}>Volver al Carrito</Button>
              <Button
                form="order-details"
                type="submit"
                variant="solid"
                colorScheme="purple"
              >
                Finalizar Compra
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};
