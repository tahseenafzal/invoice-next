import { Formik, Form, Field, ErrorMessage } from "formik";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.message) {
          errors.message = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        // send values to server, display success message, etc.
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex direction="column" alignItems="stretch">
            <Box>
              <Text>Name:</Text>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </Box>
            <Box>
              <Text>Email:</Text>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </Box>
            <Box>
              <Text>Message:</Text>
              <Field as="textarea" name="message" />
              <ErrorMessage name="message" component="div" />
            </Box>
            <Button type="submit" isDisabled={isSubmitting}>
              Send
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
