import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Header } from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => (
  <Header>
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, actions) => {
        onFormSubmit(values);
        actions.resetForm();
      }}
    >
      <Form>
        <button type="submit">
          <BsSearch size="24" />
        </button>

        <Field
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Formik>
  </Header>
);

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
